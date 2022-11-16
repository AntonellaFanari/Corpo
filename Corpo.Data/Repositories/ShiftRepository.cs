using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class ShiftRepository : IShiftRepository
    {
        private CorpoContext _context;

        public ShiftRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(Shift shift)
        {
            _context.Shift.Add(shift);
            _context.SaveChanges();
        }

        public async Task<List<Shift>> GetAll(DateTime fromDay, TimeSpan fromHour, DateTime toDay, TimeSpan toHour, int classId)
        {
            var today = DateTime.Today;

            if (classId == 0)
            {

                return await _context.Shift.Where(x =>
                    (today == fromDay)
                        ? (x.Day >= fromDay && ((x.Day == fromDay) ? x.Hour >= fromHour : true) && (x.Day <= toDay))
                        : (x.Day >= fromDay && x.Day <= toDay))

                    .OrderBy(x => x.Day).ThenBy(x => x.Hour)
                             .Include(x => x.Class)
                             .Include(x => x.User).ToListAsync();

            }
            else
            {
                return await _context.Shift.Where(x =>
                    (today == fromDay)
                        ? (x.Day >= fromDay && ((x.Day == fromDay) ? x.Hour >= fromHour : true) && (x.Day <= toDay))
                        : (x.Day >= fromDay && x.Day <= toDay))
                        .Where(x => x.ClassId == classId)

                    .OrderBy(x => x.Day).ThenBy(x => x.Hour)
                             .Include(x => x.Class)
                             .Include(x => x.User).ToListAsync();

            }



        }

        public Task<Shift> GetById(int id)
        {
            return _context.Shift.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(Shift shift)
        {
            _context.Shift.Update(shift);
            await _context.SaveChangesAsync();

        }

        public void Delete(int id)
        {
            var shiftDelete = _context.Shift.Find(id);
            _context.Shift.Remove(shiftDelete);
            _context.SaveChanges();
        }
    }
}
