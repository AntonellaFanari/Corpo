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
    public class ShiftRepository: IShiftRepository
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

        public List<Shift> GetAll(DateTime from, DateTime to, int classId)
        {
            if (classId == 0)
            {
                return _context.Shift.Where(x => x.Day >= from && x.Day <= to)
                                 .Include(x => x.Class)
                                 .Include(x => x.User).ToList();
            }
            else
            {
                return _context.Shift.Where(x => x.Day >= from && x.Day <= to && x.ClassId == classId)
                                 .Include(x => x.Class)
                                 .Include(x => x.User).ToList();
            }
            
        }

        public Shift GetById(int id)
        {
            return _context.Shift.Find(id);
        }

        public void Update(Shift shift)
        {
            _context.Shift.Update(shift);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var shiftDelete = _context.Shift.Find(id);
            _context.Shift.Remove(shiftDelete);
            _context.SaveChanges();
        }
    }
}
