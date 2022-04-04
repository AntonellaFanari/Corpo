using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IWodMemberRepository
    {
        Task<int> Add(WodMember wodMember);
        Task<WodMember> GetById(int id);
        Task Update(WodMember wodMember);
        Task Delete(int id);
        Task<List<WodMember>> GetAllWodMember(int id, DateTime from, DateTime to);
        Task<int> GetByPeriodizationIdByWeekNumber(int periodizationId, int weekNumber);
        Task<List<WodMemberAttendanceDto>> GetAttended(int id, int memberId);
        Task<List<WodMember>> GetByWeekNumber(int weekNumber, int periodizationId);
        
    }
}
