using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class WodMemberRepository : IWodMemberRepository
    {
        private CorpoContext _context;

        public WodMemberRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task<int> Add(WodMember wodMember)
        {

            await _context.WodMember.AddAsync(wodMember);
            await _context.SaveChangesAsync();
            return wodMember.Id;

        }

        public async Task<List<WodMember>> GetAllWodMember(int id, DateTime from, DateTime to)
        {
            return await _context.WodMember
               .Include(x => x.WodGroupsMember)
               .ThenInclude(x => x.Modality)
                 .Include(x => x.WodGroupsMember)
               .ThenInclude(x => x.Exercise)
               .Where(x => x.MemberId == id /*&& x.Date >= from && x.Date <= to*/)
               .ToListAsync();
        }

        public async Task Delete(int id)
        {
            var wodMember = _context.WodMember.Find(id);
            _context.WodMember.Remove(wodMember);
            await _context.SaveChangesAsync();
        }

        public Task<WodMember> GetById(int id)
        {
            return _context.WodMember.Include(x => x.WodGroupsMember)
                 .ThenInclude(x => x.Modality)
                   .Include(x => x.WodGroupsMember)
                 .ThenInclude(x => x.Exercise)
                 .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(WodMember wodMember)
        {
            _context.WodMember.Update(wodMember);
            await _context.SaveChangesAsync();
        }

        public Task<int> GetByPeriodizationIdByWeekNumber(int periodizationId, int weekNumber)
        {
            return _context.WodMember.Where(x => x.PeriodizationId == periodizationId && x.WeekNumber == weekNumber).CountAsync();
        }

        public async Task<List<WodMemberAttendanceDto>> GetAttended(int id, int memberId)
        {
            return await _context.WodMember.Where(x => x.PeriodizationId == id && x.MemberId == memberId && x.Attended == "true").GroupBy(x => x.WeekNumber).Select(x => new WodMemberAttendanceDto
            {
                WeekNumber = x.Key,
                Attendance = x.Count()
            }).ToListAsync();
        }

        public Task<List<WodMember>> GetByWeekNumber(int weekNumber, int periodizationId)
        {
            return _context.WodMember.Where(x => x.PeriodizationId == periodizationId && x.WeekNumber == weekNumber)

                .Include(x => x.WodGroupsMember)
                .ThenInclude(x => x.Exercise)

                .Include(x => x.WodGroupsMember)
                .ThenInclude(x => x.Modality)
                .ToListAsync();
        }

        public async Task<List<AttendanceMonthlyDto>> GetAttendanceByYear(int year, int memberId)
        {
            var attendances = await (from p in _context.Periodization
                                     where p.Year == year && p.MemberId == memberId
                                     join e in _context.WodMember
                                     on p.Id equals e.PeriodizationId
                                     where e.Attended == "true"
                                     group p by p.Month into g

                                     select new AttendanceMonthlyDto
                                     {
                                         Month = g.Key,
                                         Attendance = g.Count()
                                     }).ToListAsync();
            return attendances;
        }
    }
}
