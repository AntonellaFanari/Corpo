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
    class UserRepository : IUserRepository
    {
        private CorpoContext _context;
        
        public UserRepository(CorpoContext context)
        {
            _context = context;
        }

        public List<User> GetAll()
        {
            return _context.User.Include(x=> x.Role).ToList();
        }
        //roles
        public List<Role> GetRoles()
        {
            return _context.Role.ToList();
        }
    }
}
