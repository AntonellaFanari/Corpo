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
    public class CreditRepository: ICreditRepository
    {
        private CorpoContext _context;

        public CreditRepository(CorpoContext context)
        {
            _context = context;
        }

        public int Add(Credit credit)
        {
            _context.Credit.Add(credit);
            _context.SaveChanges();
            return credit.Id;
        }

        public Task<Credit> GetById(int id)
        {
            return _context.Credit.FirstOrDefaultAsync(x=> x.Id == id);
        }

        public void Update(Credit credit)
        {
            _context.Credit.Update(credit);
            _context.SaveChanges();
        }
    }
}
