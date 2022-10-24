using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class PeriodizationRepository : IPeriodizationRepository
    {
        private CorpoContext _context;

        public PeriodizationRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(Periodization periodization)
        {
            await _context.Periodization.AddAsync(periodization);
            await _context.SaveChangesAsync();
        }

        public async Task<Periodization> GetById(int id)
        {
            return await _context.Periodization.Include(x => x.PeriodizationWeeks).FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<PeriodizationWeek> GetByPeriodizationIdByWeekNumber(int periodizationId, int weekNumber)
        {
            return _context.PeriodizationWeek.FirstOrDefaultAsync(x => x.PeriodizationId == periodizationId && x.WeekNumber == weekNumber);
        }

        public Task<PeriodizationWeek> GetByPeriodizationWeek(int id)
        {
            return _context.PeriodizationWeek.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<List<Periodization>> GetByYear(int year, int id)
        {
            return _context.Periodization.Where(x => x.Year == year && x.MemberId == id).Include(x => x.PeriodizationWeeks).ToListAsync();
        }

        public Task<Periodization> GetExists(int year, int month, int memberId)
        {
            return _context.Periodization.FirstOrDefaultAsync(x => x.MemberId == memberId && x.Year == year && x.Month == month);
        }

        public Task<PeriodizationWeek> GetPeriodizationWeekByPeriodizationIdByFromTo(int id, DateTime from, DateTime to)
        {
            return _context.PeriodizationWeek.FirstOrDefaultAsync(x => x.PeriodizationId == id && x.From <= from && x.To >= to);
        }

        public Task<PeriodizationWeek> GetPeriodizationWeekPlannedByShiftDate(DateTime shiftDate)
        {
            return _context.PeriodizationWeek.FirstOrDefaultAsync(x => x.From <= shiftDate && x.To >= shiftDate && x.Planned == "true");
        }

        public async Task<Periodization> GetValidByMemberId(int id)
        {
            return await _context.Periodization.Include(x => x.PeriodizationWeeks).FirstOrDefaultAsync(x => x.MemberId == id && x.Valid);
        }

        public async Task<List<int>> GetYears(int id)
        {
            var years = new List<int>();  
            var list = await _context.Periodization.Where(x => x.MemberId == id).Select(x => new { x.Year }).ToListAsync();
            foreach (var item in list)
            {
                years.Add(item.Year);
            }

            return years;
        }

        public async Task Update(Periodization periodization)
        {
            _context.Periodization.Update(periodization);
            await _context.SaveChangesAsync();
        }


    }
}
