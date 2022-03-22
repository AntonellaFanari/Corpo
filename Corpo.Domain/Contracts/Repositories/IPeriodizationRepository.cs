using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IPeriodizationRepository
    {
        Task Add(Periodization periodization);
        Task<Periodization> GetById(int id);
        Task Update(Periodization periodization);
        Task<Periodization> GetValidByMemberId(int id);
        Task<PeriodizationWeek> GetByPeriodizationIdByWeekNumber(int periodizationId, int weekNumber);
        Task<List<Periodization>> GetByYear(int year, int id);
    }
}
