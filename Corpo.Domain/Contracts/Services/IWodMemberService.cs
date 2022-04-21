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
        Task<DomainResponse> Add(int id, int weekNumber, Periodization periodization);
        Task<DomainResponse> Update(WodMember wodMember);
        Task<DomainResponse> Delete(int id);
        Task<DomainResponse> GetAllWodMember(int id, DateTime from, DateTime to);
        Task<DomainResponse> GetAllWodMemberWeek(int id);
        Task<DomainResponse> UpdateRate(int id, int rate);
        Task<DomainResponse> GetAttended(int id, int memberId);
        Task<DomainResponse> GetByWeekNumber(int weekNumber, int memberId);
        Task<DomainResponse> GetByPeriodizationIdWeekNumber(int id, int weekNumber);
        Task<DomainResponse> DeleteWods(int periodizationId, int weekNumber);
        Task<DomainResponse> GetAttendanceByYear(int year, int memberId);
        Task<DomainResponse> UpdateRest(int id, int rest);
    }
}
