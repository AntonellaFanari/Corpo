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
    public class PeriodizationRepository: IPeriodizationRepository
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

        public async Task<Periodization> GetValidByMemberId(int id)
        {
            return await _context.Periodization.Include(x => x.PeriodizationWeeks).FirstOrDefaultAsync(x => x.MemberId == id && x.Valid);
        }

        public async Task Update(Periodization periodization)
        {
            _context.Periodization.Update(periodization);
            await _context.SaveChangesAsync();
        }
    }
}
