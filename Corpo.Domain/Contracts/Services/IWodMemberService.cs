using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IWodMemberService
    {
        Task<DomainResponse> Add(WodMember wodMember);
        Task<DomainResponse> Update(WodMember wodMember);
        Task<DomainResponse> Delete(int id);
        Task<DomainResponse> GetAllWodMember(int id, DateTime from, DateTime to);
        Task<DomainResponse> GetAllWodMemberWeek(int id);
        Task<DomainResponse> AddRate(int id, int rate);
        Task<DomainResponse> GetAttended(int id, int memberId);
        Task<DomainResponse> GetByWeekNumber(int weekNumber, int memberId);
    }
}
