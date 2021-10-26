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

        public int Add(Member member)
        {
            try
            {
                _context.Member.Add(member);
                _context.SaveChanges();
                return member.Id;
            }
            catch (DbUpdateException ex)
            {
                SqlException innerException = ex.InnerException as SqlException;
                if (innerException != null && innerException.ErrorCode == -2146232060)
                {
                    throw new UniqueException();
                }
                throw;
            }
        }

        public Member GetById(int id)
        {
            return _context.Member.Find(id);
        }

        public List<Member> GetAll()
        {
            return _context.Member.ToList();
            
        }
    }
}
