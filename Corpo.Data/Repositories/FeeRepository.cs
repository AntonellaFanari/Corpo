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

        public List<Fee> GetAll()
        {
            return _context.Fee.Include(x => x.Member).ToList();
        }

        public List<Fee> GetAllByIdMember(int id)
        {
            return _context.Fee.Where(x => x.MemberId == id).Include(x => x.Member).Include(x => x.Member.Plan).Include(x=>x.Promotion).ToList();
        }

        public Fee GetById(int id)
        {
            return _context.Fee.Include(x => x.Member).Include(x=>x.Member.Plan).FirstOrDefault(x => x.Id == id);
        }

       
    }
}
