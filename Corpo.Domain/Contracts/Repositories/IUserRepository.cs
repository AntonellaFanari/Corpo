using Corpo.Domain.Models;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IUserRepository
    {
        List<Role> GetRoles();
        List<RoleAccess> GetRoleAccess(int roleId);
        List<User> GetAll();
        void Add(User user);
        User GetById(int id);
        User GetByIdAccount(int id);
        User GetByEmail(string email);
        void Update(User user);
        void Delete(int id);
    }
}
