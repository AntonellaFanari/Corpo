using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class AnamnesisService : IAnamnesisService
    {
        private IAnamnesisRepository _anamnesisRepository;
        private ITestTemplateRepository _testTemplateRepository;
        private ITestMemberService _testMemberService;

        public AnamnesisService(IAnamnesisRepository anamnesisRepository, ITestMemberService testMemberService,
            ITestTemplateRepository testTemplateRepository)
        {
            _anamnesisRepository = anamnesisRepository;
            _testTemplateRepository = testTemplateRepository;
            _testMemberService = testMemberService;
        }

        public async Task<DomainResponse> Add(int id, Anamnesis anamnesis)
        {

            anamnesis.MemberId = id;
            anamnesis.Level = await this.DetermineLevel(anamnesis);
            int testId = await this.AddTestMember(id, anamnesis.Level);
            await _anamnesisRepository.Add(anamnesis);
            return new DomainResponse
            {
                Success = true,
                Result = new { anamnesis.Level, anamnesis.MemberId, testId }
            };
        }

        private async Task<int> DetermineLevel(Anamnesis anamnesis)
        {
            if (anamnesis.CurrentlyPhysicalActivity && anamnesis.Competitive && anamnesis.CurrentlyStrengthTraining)
            {
                return 3;
            }
            else if (anamnesis.CurrentlyPhysicalActivity && anamnesis.Competitive && !anamnesis.CurrentlyStrengthTraining)
            {
                return 2;
            }
            else if (anamnesis.CurrentlyPhysicalActivity && anamnesis.ConstantfollowUpSpreadsheet && anamnesis.CurrentlyStrengthTraining)
            {
                return 3;
            }
            else if (anamnesis.CurrentlyPhysicalActivity && anamnesis.ConstantfollowUpSpreadsheet && !anamnesis.CurrentlyStrengthTraining)
            {
                return 2;
            }
            else if (anamnesis.CurrentlyPhysicalActivity && anamnesis.RecreationalAndSporadic && anamnesis.CurrentlyStrengthTraining)
            {
                return 3;
            }
            else if (anamnesis.CurrentlyPhysicalActivity && anamnesis.RecreationalAndSporadic && !anamnesis.CurrentlyStrengthTraining && anamnesis.NumberTrainingSessionsWeek >= 3)
            {
                return 2;
            }
            else if (anamnesis.CurrentlyPhysicalActivity && anamnesis.RecreationalAndSporadic && !anamnesis.CurrentlyStrengthTraining && anamnesis.NumberTrainingSessionsWeek < 3)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

      

        private async Task<int> AddTestMember(int id, int level)
        {
            var test = await _testTemplateRepository.GetByLevel(level);
            var testMember = new TestMember();
            testMember.Level = test.Level;
            testMember.MemberId = id;
            testMember.Status = StatusTest.Pending;
            testMember.TestTemplateId = test.Id;
            testMember.Date = DateTime.Now;
            testMember.TestExercisesMember = new List<TestExerciseMember>();
            foreach (var exercise in test.TestExercises)
            {
                var newExercise = new TestExerciseMember
                {
                    Name = exercise.Name,
                    TestType = exercise.TestType,
                    Seconds = exercise.Seconds,
                    Minutes = exercise.Minutes,
                    Video = exercise.Video,
                    Status = StatusTest.Pending,
                    ExerciseFmsId = exercise.ExerciseFmsId
                };

                testMember.TestExercisesMember.Add(newExercise);

            }

            int testId = await _testMemberService.AddTest(testMember);
            return testId;
        }

        public async Task<DomainResponse> GetByMemberId(int id)
        {
            var response = await _anamnesisRepository.GetByMemberId(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetLevel(int id)
        {
            var response = await _anamnesisRepository.GetByMemberId(id);
            return new DomainResponse
            {
                Success = true,
                Result = new { response.Level }
            };
        }
    }
}
