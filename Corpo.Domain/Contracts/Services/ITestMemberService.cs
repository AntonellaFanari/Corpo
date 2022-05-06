using Corpo.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ITestMemberService
    {
        Task<DomainResponse> GetAll();
        Task<DomainResponse> GetAllByMemberId(int id);
        Task<DomainResponse> Add(TestMember test);
        Task<DomainResponse> Delete(int id);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(TestMember test);
        Task<DomainResponse> GetPendingByMemberId(int id);
        Task<DomainResponse> GetExerciseById(int id);
        Task<DomainResponse> AddResultTestHeartRateExercise(TestHeartRateExercise result);
        Task<DomainResponse> AddResultTestRepetitionExercise(TestRepetitionExercise result);
        Task<DomainResponse> AddResultTestVideoExercise(TestVideoExercise result, IFormFileCollection files);
        Task<DomainResponse> GetResult(int id);

    }
}
