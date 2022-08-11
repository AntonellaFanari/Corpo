using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class TestMemberService : ITestMemberService
    {
        private ITestMemberRepository _testMemberRepository;
        private IMemberService _memberService;

        public TestMemberService(ITestMemberRepository testMemberRepository, IMemberService memberService)
        {
            _testMemberRepository = testMemberRepository;
            _memberService = memberService;
        }

        public async Task<DomainResponse> Add(TestMember test)
        {
            try
            {
                await this.AddTest(test);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo asignar el test.");
            }
        }

        public async Task<DomainResponse> AddPhysicalLevel(int id, int level)
        {
            var physicalLevel = new PhysicalLevel
            {
                Date = DateTime.Now,
                Level = level,
                MemberId = id
            };
            await _testMemberRepository.AddPhysicalLevel(physicalLevel);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<int> AddTest(TestMember test)
        {
            test.Date = DateTime.Now;
            test.Status = StatusTest.Pending;
            int id = await _testMemberRepository.Add(test);
            return id;
        }


        public async Task<DomainResponse> AddResultTestHeartRateExercise(TestHeartRateExercise result, int userId)
        {
            try
            {
                var testExerciseMember = await _testMemberRepository.GetExerciseById(result.TestExerciseMemberId);
                testExerciseMember.Status = StatusTest.Executed;
                if (testExerciseMember.Name.ToLower().Equals("1 milla"))
                {
                    var resultTestRockport = await this.GetResultTestMilla(userId, this.GetMinutes(result.minutes, result.Seconds), result.FinalHeartRate);
                    result.Level = resultTestRockport.Level.ToString();
                    result.V02Maximum = resultTestRockport.v02Maximum;
                }
                await _testMemberRepository.AddResultTestHeartRateExercise(result);
                await _testMemberRepository.UpdateExercise(testExerciseMember);

                await this.VerifyStatusTest(result.TestMemberId);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el resultado del ejercicio.");
            }
        }


        private decimal GetMinutes(int minutes, int seconds)
        {
            return (seconds / 60) + minutes;
        }

        private async Task VerifyStatusTest(int testId)
        {
            var pendingExercise = await _testMemberRepository.GetPendingExercise(testId);
            if (!pendingExercise)
            {
                var testMember = await _testMemberRepository.GetById(testId);
                testMember.Status = StatusTest.Executed;
                await _testMemberRepository.Update(testMember);
                await this.AddPhysicalLevel(testMember.MemberId, testMember.Level);
            }
        }

        private async Task<ResultTestRockportDto> GetResultTestMilla(int userId, decimal time, int finalHeartRate)
        {
            var historyMedical = _memberService.GetMedicalHistoryByIdMember(userId).Result as MedicalHistory;
            var age = await _memberService.GetAgeMember(userId);
            var gender = (historyMedical.Gender == "man") ? 1 : 0;
            decimal v02Maximum = this.GetV02Maximum(time, historyMedical.Weight, age, gender, finalHeartRate);
            var level = this.GetResultTestRockport(gender, v02Maximum, age);
            return new ResultTestRockportDto{ Level = level, v02Maximum = v02Maximum};
        }

        private decimal GetV02Maximum(decimal minutes, decimal weight, int age, int gender, int finalHeartRate)
        {

            return 132.6m - (0.17m * weight) - (0.39m * age) + (6.31m * gender) - (3.27m * minutes) - (0.156m * finalHeartRate);

        }

        private Level GetResultTestRockport(int gender, decimal v02Maximum, int age)
        {
            return (gender == 1) ? this.GetLevelMan(v02Maximum, age) : this.GetLevelWoman(v02Maximum, age);
        }

        private Level GetLevelMan(decimal v02Maximum, int ageMember)

        {
            List<TestRockportDto> testRockport = new List<TestRockportDto>();
            var test = new TestRockportDto(0, 29, 0, 41, 42, 45, 45, 50, 51, 55, 56, 100);
            testRockport.Add(test);
            test = new TestRockportDto(30, 39, 0, 40, 41, 43, 44, 47, 48, 53, 54, 100);
            testRockport.Add(test);
            test = new TestRockportDto(40, 49, 0, 37, 38, 41, 42, 45, 46, 52, 53, 100);
            testRockport.Add(test);
            test = new TestRockportDto(50, 59, 0, 34, 35, 37, 38, 42, 43, 49, 50, 100);
            testRockport.Add(test);
            test = new TestRockportDto(60, 69, 0, 30, 31, 34, 35, 38, 39, 45, 46, 100);
            testRockport.Add(test);

            Level level = 0;
            var queryTest = testRockport.FirstOrDefault(x => x.AgeLowerLimit <= ageMember && x.AgeUpperLimit >= ageMember);
            if (test != null)
            {
               level = this.DetermineLevelTestRockport(queryTest, v02Maximum);
            }

            return level;
        }

        private Level GetLevelWoman(decimal v02Maximum, int ageMember)

        {
            List<TestRockportDto> testRockport = new List<TestRockportDto>();
            var test = new TestRockportDto(0, 29, 0, 35, 36, 39, 40, 43, 44, 49, 50, 100);
            testRockport.Add(test);
            test = new TestRockportDto(30, 39, 0, 33, 34, 36, 37, 40, 41, 45, 46, 100);
            testRockport.Add(test);
            test = new TestRockportDto(40, 49, 0, 31, 32, 34, 35, 38, 39, 44, 45, 100);
            testRockport.Add(test);
            test = new TestRockportDto(50, 59, 0, 25, 26, 28, 29, 31, 32, 35, 36, 100);
            testRockport.Add(test);
            test = new TestRockportDto(60, 69, 0, 24, 25, 28, 29, 30, 31, 34, 35, 100);
            testRockport.Add(test);

            Level level = 0;
            var queryTest = testRockport.FirstOrDefault(x => x.AgeLowerLimit <= ageMember && x.AgeUpperLimit >= ageMember);
            if (test != null)
            {
               level = this.DetermineLevelTestRockport(queryTest, v02Maximum);
            }

            return level;
        }

        private Level DetermineLevelTestRockport(TestRockportDto test, decimal v02Maximum)
        {
           
            if (v02Maximum >= test.NivelBajoLowerLimit && v02Maximum <= test.NivelBajoUpperLimit)
            {
                return Level.Bajo;
            }
            else if (v02Maximum >= test.NivelRegularLowerLimit && v02Maximum <= test.NivelRegularUpperLimit)
            {
                return Level.Regular;
            }
            else if (v02Maximum >= test.NivelBuenoLowerLimit && v02Maximum <= test.NivelBuenoUpperLimit)
            {
                return Level.Bueno;
            }
            else if (v02Maximum >= test.NivelExcelenteLowerLimit && v02Maximum <= test.NivelExcelenteUpperLimit)
            {
                return Level.Excelente;
            }
            else
            {
                return Level.Superior;
            }
        }

        public async Task<DomainResponse> AddResultTestRepetitionExercise(TestRepetitionExercise result)
        {
            try
            {
                var testExerciseMember = await _testMemberRepository.GetExerciseById(result.TestExerciseMemberId);
                testExerciseMember.Status = StatusTest.Executed;
                await _testMemberRepository.AddResultTestRepetitionExercise(result);
                await _testMemberRepository.UpdateExercise(testExerciseMember);
                var pendingExercise = await _testMemberRepository.GetPendingExercise(result.TestMemberId);
                if (!pendingExercise)
                {
                    var testMember = await _testMemberRepository.GetById(result.TestMemberId);
                    testMember.Status = StatusTest.Executed;
                    await _testMemberRepository.Update(testMember);
                    await this.AddPhysicalLevel(testMember.MemberId, testMember.Level);
                }
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el resultado del ejercicio.");
            }
        }

        public async Task<DomainResponse> AddResultTestVideoExercise(TestVideoExercise result, IFormFileCollection files)
        {
            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    var path = Path.Combine("wwwroot", "videos-img-fms", file.FileName);
                    if (file.ContentType == "video/mp4")
                    {
                        result.PathVideo = Path.Combine("videos-img-fms", file.FileName);
                    }
                    else if (file.ContentType == "image/png" || file.ContentType == "image/jpg")
                    {
                        result.PathImg = Path.Combine("videos-img-fms", file.FileName);
                    }
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    };

                }
                var testExerciseMember = await _testMemberRepository.GetExerciseById(result.TestExerciseMemberId);
                testExerciseMember.Status = StatusTest.Executed;
                await _testMemberRepository.AddResultTestVideoExercise(result);
                await _testMemberRepository.UpdateExercise(testExerciseMember);
                var pendingExercise = await _testMemberRepository.GetPendingExercise(result.TestMemberId);
                if (!pendingExercise)
                {
                    var testMember = await _testMemberRepository.GetById(result.TestMemberId);
                    testMember.Status = StatusTest.Executed;
                    await _testMemberRepository.Update(testMember);
                    await this.AddPhysicalLevel(testMember.MemberId, testMember.Level);

                }
                return new DomainResponse { Success = true };

            }
            else
            {
                return new DomainResponse(false, "no hay video para guardar", "No se seleccionó video .");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _testMemberRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _testMemberRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetAllByMemberId(int id)
        {
            var response = await _testMemberRepository.GetAllByMemberId(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _testMemberRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetExerciseById(int id)
        {
            var response = await _testMemberRepository.GetExerciseById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetExerciseFms(int id)
        {
            var response = await _testMemberRepository.GetExerciseFms(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetPendingByMemberId(int id)
        {
            var response = await _testMemberRepository.GetPendingByMemberId(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetResult(int id)
        {
            var response = await _testMemberRepository.GetResult(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(TestMember test)
        {
            try
            {
                var testQuery = await _testMemberRepository.GetById(test.Id);
                testQuery.TestExercisesMember = test.TestExercisesMember;
                await _testMemberRepository.Update(testQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la asignación del test.");
            }
        }

        public async Task<DomainResponse> GetDetailById(int id)
        {
            var response = await _testMemberRepository.GetDetailById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetExistsTestPending(int id)
        {
            var response = await _testMemberRepository.GetExistsTestPending(id);
                return new DomainResponse
                {
                    Success = true,
                    Result = new { response.Id, response.Level}
                };
        }
    }
}
