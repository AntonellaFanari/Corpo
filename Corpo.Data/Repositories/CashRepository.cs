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
            return _context.Cash.OrderBy(x => x.Opening).LastOrDefaultAsync();
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
            if (type == "outflow") { monthlyCash.Total -= amount; } else { monthlyCash.Total += amount; }
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

        public async Task<List<RecordCashDto>> GetDetailed(DateTime opening, DateTime? closing)
        {
            closing = closing ?? DateTime.Now;
            var list = new List<RecordCashDto>();
            var fees = await _context
                .Fee
                .Include(x => x.Member)
                .Where(x => x.Date >= opening && x.Date <= closing).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = x.PlanName,
                    Amount = x.Pay,
                    Member = x.Member.LastName + " " + x.Member.Name,
                    User = x.UserName,
                    Transaction = "Cuota"
                }).ToListAsync();
            foreach (var fee in fees)
            {
                list.Add(fee);
            };
            var sales = await _context
                .Sale
                .Include(x => x.Member)
                .Where(x => x.Date >= opening && x.Date <= closing && x.Status == Status.Valid).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = "",
                    Amount = x.Pay,
                    Member = x.Member.LastName + " " + x.Member.Name,
                    User = x.UserName,
                    Transaction = "Venta"
                }).ToListAsync();
            foreach (var sale in sales)
            {
                list.Add(sale);
            };
            var incomes = await _context
                .Income
                .Include(x => x.User)
                .Where(x => x.Date >= opening && x.Date <= closing).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = x.Detail,
                    Amount = x.Amount,
                    User = x.User.LastName + " " + x.User.Name,
                    Transaction = "Ingreso"
                }).ToListAsync();
            foreach (var income in incomes)
            {
                list.Add(income);
            };
            var outflows = await _context
                .Outflow
                .Include(x => x.User)
                .Include(x => x.OutflowType)
                .Where(x => x.Date >= opening && x.Date <= closing).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = x.OutflowType.Name,
                    Amount = x.Pay,
                    User = x.User.LastName + " " + x.User.Name,
                    Transaction = "Egreso"
                }).ToListAsync();
            foreach (var outflow in outflows)
            {
                list.Add(outflow);
            };
            var withdrawals = await _context
                .Withdrawal
                .Include(x => x.User)
                .Include(x => x.WithdrawalName)
                .Where(x => x.Date >= opening && x.Date <= closing).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = x.WithdrawalName.Name,
                    Amount = x.Amount,
                    User = x.User.LastName + " " + x.User.Name,
                    Transaction = "Retiro"
                }).ToListAsync();
            foreach (var withdrawal in withdrawals)
            {
                list.Add(withdrawal);
            };
            return list.OrderBy(x => x.Date).ToList();
            }

        public Task<Cash> GetByDate(DateTime date)
        {
            return _context.Cash.FirstOrDefaultAsync(x => x.Opening.Day == date.Day && x.Opening.Month == date.Month && x.Opening.Year == date.Year);
        }

        public async Task<List<MonthlyCash>> GetAllMonthlyCash()
        {
            var date = DateTime.Now;
            return await _context.MonthlyCash.Where(x => x.Date.Year == date.Year).OrderBy(x => x.Date.Month).ToListAsync();
        }

        public async Task<List<RecordCashDto>> GetRecordCashByMonth(int month)
        {
            var date = DateTime.Now;
            var list = new List<RecordCashDto>();
            var incomes = await _context
               .Income
               .Include(x => x.User)
               .Where(x => x.Date.Month == month && x.Date.Year == date.Year).Select(x => new RecordCashDto
               {
                   Id = x.Id,
                   Date = x.Date,
                   Detail = x.Detail,
                   Amount = x.Amount,
                   User = x.User.LastName + " " + x.User.Name,
                   Transaction = "Ingreso"
               }).ToListAsync();
            foreach (var income in incomes)
            {
                list.Add(income);
            };
            var outflows = await _context
                .Outflow
                .Include(x => x.User)
                .Include(x => x.OutflowType)
                .Where(x => x.Date.Month == month && x.Date.Year == date.Year).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = x.OutflowType.Name,
                    Amount = x.Pay,
                    User = x.User.LastName + " " + x.User.Name,
                    Transaction = "Egreso"
                }).ToListAsync();
            foreach (var outflow in outflows)
            {
                list.Add(outflow);
            };
            var withdrawals = await _context
                .Withdrawal
                .Include(x => x.User)
                .Include(x => x.WithdrawalName)
                .Where(x => x.Date.Month == month && x.Date.Year == date.Year).Select(x => new RecordCashDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Detail = x.WithdrawalName.Name,
                    Amount = x.Amount,
                    User = x.User.LastName + " " + x.User.Name,
                    Transaction = "Retiro"
                }).ToListAsync();
            foreach (var withdrawal in withdrawals)
            {
                list.Add(withdrawal);
            };
            return list.OrderBy(x => x.Date).ToList();
        }
    }
}
