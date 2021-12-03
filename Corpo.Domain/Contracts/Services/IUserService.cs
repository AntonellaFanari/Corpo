using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IUserService
    {
        List<Role> GetRoles();
        List<User> GetAll();
        DomainResponse Add(UserDto user);
        User GetById(int id);
        DomainResponse GetAllByNameRole(string role);
        DomainResponse Update(int id, User user);
        DomainResponse Delete(int id, string email);
    }
}
