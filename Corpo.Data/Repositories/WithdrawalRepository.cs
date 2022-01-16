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
    public class WithdrawalRepository: IWithdrawalRepository
    {
        private CorpoContext _context;

        public WithdrawalRepository(CorpoContext context)
        {
            _context = context;
        }

        // withdrawalName
        public void AddWithdrawalName(WithdrawalName withdrawalName)
        {
            _context.WithdrawalName.Add(withdrawalName);
            _context.SaveChanges();
        }

        public void DeleteWithdrawalName(int id)
        {
            var withdrawalName = _context.WithdrawalName.Find(id);
            _context.Remove(withdrawalName);
            _context.SaveChanges();
        }

        public Task<List<WithdrawalName>> GetAllWithdrawalName()
        {
            return _context.WithdrawalName.ToListAsync();
        }

        public Task<WithdrawalName> GetWithdrawalNameById(int id)
        {
            return _context.WithdrawalName.FirstOrDefaultAsync(x => x.Id == id);
        }

        public void UpdateWithdrawalName(WithdrawalName withdrawalName)
        {
            _context.WithdrawalName.Update(withdrawalName);
            _context.SaveChanges();
        }

        // withdrawal
        public Task<List<Withdrawal>> GetAllWithdrawal()
        {
            return _context.Withdrawal.ToListAsync();
        }

        public void AddWithdrawal(Withdrawal withdrawal)
        {
            _context.Withdrawal.Add(withdrawal);
            _context.SaveChanges();
        }

        public Task<Withdrawal> GetWithdrawalById(int id)
        {
            return _context.Withdrawal.Include(x=>x.WithdrawalName).FirstOrDefaultAsync(x => x.Id == id);
        }

        public void DeleteWithdrawal(int id)
        {
            var withdrawal = _context.Withdrawal.Find(id);
            _context.Remove(withdrawal);
            _context.SaveChanges();
        }
    }
}
