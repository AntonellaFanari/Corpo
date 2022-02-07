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

        public Task<List<Cash>> GetCashCurrentMonth()
        {
            var date = DateTime.Now;
            return _context.Cash.Where(x => x.Opening.Month == date.Month).ToListAsync();
        }

        public Task<List<Cash>> GetCash(DateTime from, DateTime to)
        {
            return _context.Cash.Where(x => x.Opening >= from && x.Opening <= to).ToListAsync();
        }

        public async Task<List<RecordCashDto>> GetDetailed(DateTime opening, DateTime closing)
        {
            var list = new List<RecordCashDto>();
            try
            {
                var fees = await _context.Fee.Include(x => x.Member).Where(x => x.Date >= opening && x.Date <= closing).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = "Cuota " + x.PlanName,
                    Amount = x.Pay,
                    Member = x.Member.LastName + " " + x.Member.Name,
                    User = "hjfjjj",
                }).ToListAsync();
                list = fees;
                return list;
            }
            catch (Exception ex)
            {

                throw;
            }
           
            //list.Add(fees);
            //var sales = await _context.Sale.Include(x => x.Member).Where(x => x.Date >= opening && x.Date <= closing).ToListAsync();
            //list.Add(sales);
            //var incomes = await _context.Income.Where(x => x.Date >= opening && x.Date <= closing).ToListAsync();
            //list.Add(incomes);
            //var outflows = await _context.Outflow.Include(x => x.User).Where(x => x.Date >= opening && x.Date <= closing).ToListAsync();
            //list.Add(outflows);
            //var withdrawals = await _context.Withdrawal.Include(x => x.User).Where(x => x.Date >= opening && x.Date <= closing).ToListAsync();
            //list.Add(withdrawals);
        }
    }
}
