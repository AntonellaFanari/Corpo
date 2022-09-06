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
    public class BalancePaidRepository: IBalancePaidRepository
    {
        private CorpoContext _context;

        public BalancePaidRepository(CorpoContext context)
        {
            _context = context;
        }

        public Task Add(BalancePaid balancePaid)
        {
            foreach (var balance in balancePaid.BalancesToPay)
            {
                _context.BalanceToPay.Attach(balance);
            };
            _context.BalancePaid.Add(balancePaid);
            _context.SaveChanges();
            return null;
        }

        public async Task Cancel(CancelBalancePaid cancelBalancePaid)
        {
            var balancePaid = await _context.BalancePaid.FindAsync(cancelBalancePaid.BalancePaidId);
            balancePaid.Status = Status.Canceled;
            _context.BalancePaid.Update(balancePaid);
           await _context.SaveChangesAsync();
            _context.CancelBalancePaid.Add(cancelBalancePaid);
            await _context.SaveChangesAsync();
        }

        public Task<List<BalancePaid>> GetAll(DateTime from, DateTime? to)
        {
            return _context.BalancePaid.Where(to != null ? (x => x.Date >= from && x.Date <= to) : (x => x.Date >= from)).ToListAsync();

        }

        public Task<BalancePaid> GetById(int id)
        {
            return _context.BalancePaid.Include(x => x.BalancesToPay).FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<CancelBalancePaid> GetCancelById(int id)
        {
            return _context.CancelBalancePaid.FirstOrDefaultAsync(x => x.BalancePaidId == id);
        }
    }
}
