﻿using Corpo.Domain.Models;
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
        Task<List<Role>> GetRoles();
        List<RoleAccess> GetRoleAccess(int roleId);
        List<User> GetAll();
        void Add(User user);
        User GetById(int id);
        User GetByIdAccount(int id);
        User GetByEmail(string email);
        List<User> GetAllByNameRole(string role);
        void Update(User user);
        void Delete(int id);
        Task AddRole(Role role);
    }
}
