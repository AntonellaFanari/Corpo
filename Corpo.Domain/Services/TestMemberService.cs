using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class TestMemberService: ITestMemberService
    {
        private ITestMemberRepository _testMemberRepository;

        public TestMemberService(ITestMemberRepository testMemberRepository)
        {
            _testMemberRepository = testMemberRepository;
        }

        public async Task<DomainResponse> Add(TestMember test)
        {
            try
            {
                test.Date = DateTime.Now;
                test.Status = StatusTest.Pending;
                await _testMemberRepository.Add(test);
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

        public async Task<DomainResponse> AddResultTestHeartRateExercise(TestHeartRateExercise result)
        {
            try
            {
                var testExerciseMember = await _testMemberRepository.GetExerciseById(result.TestExerciseMemberId);
                testExerciseMember.Status = StatusTest.Executed;
                await _testMemberRepository.AddResultTestHeartRateExercise(result);
                await _testMemberRepository.UpdateExercise(testExerciseMember);
                var pendingExercise = await _testMemberRepository.GetPendingExercise(result.TestMemberId);
                if (!pendingExercise)
                {
                    var testMember = await _testMemberRepository.GetById(result.TestMemberId);
                    testMember.Status = StatusTest.Executed;
                    await _testMemberRepository.Update(testMember);
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
                    var path = Path.Combine("wwwroot", "videos", file.FileName);
                    result.Path = Path.Combine("videos", file.FileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    };
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
                    }

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

    }
}
