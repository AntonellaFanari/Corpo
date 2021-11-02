using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class MemberRepository : IMemberRepository
    {
        private CorpoContext _context;

        public MemberRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(Member member)
        {
                _context.Member.Add(member);
                _context.SaveChanges();
        }

        public Member GetById(int id)
        {
            var member = _context.Member
                    .Include(x=>x.Plan)
                    .Include(x => x.Account)
                    .ToList();
            return member.Find(x => x.Id == id);
        }

        public List<Member> GetAll()
        {
            var list = _context.Member
                    .Include(x=>x.Plan)
                    .Include(x => x.Account)
                    .ToList();
            return list;
        }

        public Member GetByEmail(string email)
        {
            return _context.Member.Find(email);
        }
    }
}
