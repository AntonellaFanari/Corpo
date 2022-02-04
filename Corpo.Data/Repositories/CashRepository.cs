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
    public class CashRepository : ICashRepository
    {
        private CorpoContext _context;

        public CashRepository(CorpoContext context)
        {
            _context = context;
        }

        public Task<Cash> GetById(int id)
        {
            return _context.Cash.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<Cash> GetLastCash()
        {
            return _context.Cash.OrderBy(x => x.Opening).LastAsync();
        }

        public Task<MonthlyCash> GetMonthlyCash(DateTime date)
        {
            return _context.MonthlyCash.FirstOrDefaultAsync(x => x.Date.Month == date.Month && x.Date.Year == date.Year);
        }

        public async Task UpdateMonthlyCash(DateTime date, decimal amount, string type)
        {

            var monthlyCash = await GetMonthlyCash(date);
            if (monthlyCash == null)
            {
                monthlyCash = await AddMonthlyCash();
            }
            if (type == "income") { monthlyCash.Total -= amount; } else { monthlyCash.Total += amount; }
            _context.MonthlyCash.Update(monthlyCash);
            _context.SaveChanges();

        }

        public async Task<MonthlyCash> AddMonthlyCash()
        {
            var monthlyCash = new MonthlyCash { Date = DateTime.Now, Total = 0 };
            _context.MonthlyCash.Add(monthlyCash);
            await _context.SaveChangesAsync();
            return monthlyCash;

        }

        public async Task UpdateCash(Cash cash)
        {
            _context.Cash.Update(cash);
            await _context.SaveChangesAsync();
        }

        public async Task AddCash(Cash cash)
        {
            
                _context.Cash.Add(cash);
                await _context.SaveChangesAsync();
                var mothlyCash = await this.GetMonthlyCash(cash.Opening);
                if (mothlyCash == null)
                {
                    await this.AddMonthlyCash();
                }
         
        }
    }
}
