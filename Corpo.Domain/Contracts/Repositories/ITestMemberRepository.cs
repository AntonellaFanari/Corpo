using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ITestMemberRepository
    {
        Task<List<TestMember>> GetAll();
        Task<List<TestMember>> GetAllByMemberId(int id);
        Task<int> Add(TestMember test);
        Task Delete(int id);
        Task<TestMember> GetById(int id);
        Task Update(TestMember test);
        Task<TestMember> GetPendingByMemberId(int id);
        Task<TestExerciseMember> GetExerciseById(int id);
        Task AddResultTestHeartRateExercise(TestHeartRateExercise result);
        Task AddResultTestRepetitionExercise(TestRepetitionExercise result);
        Task UpdateExercise(TestExerciseMember exerciseMember);
        Task<bool> GetPendingExercise(int id);
        Task AddResultTestVideoExercise(TestVideoExercise result);
        Task<List<TestExerciseMember>> GetResult(int id);
        Task<ExerciseFMS> GetExerciseFms(int id);
        Task<TestMember> GetDetailById(int id);
        Task AddPhysicalLevel(PhysicalLevel physicalLevel);
        Task<TestMember> GetExistsTestPending(int id);
    }
}
