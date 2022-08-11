using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class FeeRepository: IFeeRepository
    {
        private CorpoContext _context;

        public FeeRepository(CorpoContext context)
        {
            _context = context;
        }

        public int Add(Fee fee)
        {
            _context.Fee.Add(fee);
            _context.SaveChanges();
            return fee.Id;
        }

        public async Task<int> Delete(int id)
        {
            var fee = await _context.Fee.Include(x => x.Member).ThenInclude(x => x.Credit).FirstOrDefaultAsync(x => x.Id == id);
            var creditId = fee.Member.CreditId;
            _context.Fee.Remove(fee);
            await _context.SaveChangesAsync();
            return creditId;
        }

        public async Task<List<SaleFeeIncomeDto>> GetAll(DateTime from, DateTime? to)
        {
            var list = new List<SaleFeeIncomeDto>();
            var listFee = await _context.Fee.Include(x => x.Member)
                .Where(to != null ? (x => x.Date >= from && x.Date <= to) : (x => x.Date >= from))
                .Select(x => new SaleFeeIncomeDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Pay = x.Pay,
                    IncomeType = IncomeType.fee
                }).ToListAsync();
            var listBalancePaid = await _context.BalancePaid
                .Where(to != null ? (x => x.Date >= from && x.Date <= to && x.IncomeType == IncomeType.payFee) : (x => x.Date >= from && x.IncomeType == IncomeType.payFee))
                .Select(x => new SaleFeeIncomeDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Pay = x.Pay,
                    IncomeType = x.IncomeType
                }).ToListAsync();
            foreach (var item in listFee)
            {
                list.Add(item);
            };
            foreach (var item in listBalancePaid)
            {
                list.Add(item);
            };
            return list.OrderBy(x => x.Date).ToList();
        }

        public List<Fee> GetAllByIdMember(int id)
        {
            return _context.Fee.Where(x => x.MemberId == id).Include(x => x.Member).Include(x => x.Member.Plan).Include(x => x.Promotion).ToList();
        }

        public async Task<Fee> GetById(int id)
        {
            return await _context.Fee.Include(x => x.Member).Include(x => x.Member.Plan).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Fee> GetLastPayment(int id)
        {
            return await _context.Fee.Where(x => x.MemberId == id).OrderBy(x => x.Date).LastOrDefaultAsync();
        }
    }
}
