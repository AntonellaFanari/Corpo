using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Corpo.Domain.Views;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    class UserRepository : IUserRepository
    {
        private CorpoContext _context;

        public UserRepository(CorpoContext context)
        {
            _context = context;
        }

        public List<User> GetAll()
        {
            return _context.User.
                Include(x=>x.Role).ToList();
        }

        public List<Role> GetRoles()
        {
            return _context.Role.ToList();
        }

        public void Add(User user)
        {
            try
            {
                _context.User.Add(user);
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                SqlException innerException = ex.InnerException as SqlException;
                if (innerException != null && innerException.ErrorCode == -2146232060)
                {
                    throw new UniqueException();
                }
            }
            

        }

        public User GetById(int id)
        {
           return _context.User.Find(id);
        }

        public void Delete(int id)
        {
            var userDelete = _context.User.Find(id);
            _context.User.Remove(userDelete);
            _context.SaveChanges();
        }

        public void Update(int id, User user)
        {
            user.Id = id;
            _context.User.Update(user);
            _context.SaveChanges();
        }
    }
}