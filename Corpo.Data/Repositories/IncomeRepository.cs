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
    public class IncomeRepository: IIncomeRepository
    {
        private CorpoContext _context;

        public IncomeRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(Income income)
        {
                _context.Income.Add(income);
                await _context.SaveChangesAsync();

        }

        public async Task Delete(int id)
        {
            var income = await _context.Income.FirstOrDefaultAsync(x => x.Id == id);
            _context.Income.Remove(income);
            await _context.SaveChangesAsync();
        }

        public Task<List<Income>> GetAll(DateTime from, DateTime? to)
        {
            return _context.Income.Where(to != null ? (x => x.Date >= from && x.Date <= to) : (x => x.Date >= from)).ToListAsync();
        }

        public Task<Income> GetById(int id)
        {
            return _context.Income.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
