using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class BalanceRepository: IBalanceRepository
    {
        private CorpoContext _context;

        public BalanceRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(BalanceToPay balance)
        {
            _context.BalanceToPay.Add(balance);
            _context.SaveChanges();
        }

        public List<BalanceToPayView> GetAll()
        {
            var listBalance = _context.BalanceToPay.Where(x => x.Statement == Statement.Unpaid || x.Statement == Statement.UnCompensated).Include(x => x.Member).GroupBy(x => new { x.MemberId}).Select(x => new BalanceToPayView
            {
                IdMember = x.Key.MemberId,
                Balance = x.Sum(c => c.Balance),
                Pay = x.Sum(c => c.Pay)
            }).ToList();
            foreach (var item in listBalance)
            {
                var b = this.GetByIdMember(item.IdMember);
                item.LastName = b.Member.LastName;
                item.Name = b.Member.Name;
                item.Id = b.Id;
                item.Statement = b.Statement;
                item.Pay = b.Pay;
            };
            return listBalance;
        }

        public List<BalanceToPay> GetAllByIdMember(int id)
        {
            return _context.BalanceToPay.Where(x => x.MemberId == id && x.Statement == Statement.Unpaid).Include(x => x.Member).ToList();
        }

        public BalanceToPay GetById(int id)
        {
            return _context.BalanceToPay.Find(id);
        }

        public BalanceToPay GetPositiveBalanceByIdMember(int id)
        {
            return _context.BalanceToPay.FirstOrDefault(x => x.MemberId == id && x.Balance < 0 && x.Statement == Statement.UnCompensated);
        }

        public void Update(BalanceToPay balance)
        {
            _context.BalanceToPay.Update(balance);
            _context.SaveChanges();
        }

        private BalanceToPay GetByIdMember(int id)
        {
            return _context.BalanceToPay.Include(x => x.Member).FirstOrDefault(x=>x.MemberId == id && x.Statement == Statement.Unpaid);
        }

        public List<BalanceToPay> GetAllNegativeBalanceByIdMember(int id)
        {
            return _context.BalanceToPay.Where(x => x.MemberId == id && x.Balance>0 && x.Statement == Statement.Unpaid).OrderBy(x=>x.Date).ToList();
        }

        public Task<BalanceToPay> GetByIdTransaction(int id, TransactionType transactionType)
        {
            return _context.BalanceToPay.FirstOrDefaultAsync(x => x.transactionId == id && x.Transaction == transactionType);
        }
    }
}
