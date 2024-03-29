﻿using Corpo.Domain.Contracts.Repositories;
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
            var list =_context.User
                    .Include(x=>x.Role)
                    .Include(x=>x.Account)
                    .ToList();
            return list;
        }

        public Task<List<Role>> GetRoles()
        {
            return _context.Role.ToListAsync();
        }

        public List<RoleAccess> GetRoleAccess(int roleId)
        {
            return _context.RoleAccess.Where(x => x.RoleId == roleId).ToList();
        }

        public void Add(User user)
        {
                _context.User.Add(user);
                _context.SaveChanges();
             
        }

        public User GetById(int id)
        {
            var user = _context.User
                    .Include(x => x.Role)
                    .Include(x => x.Account)
                   .FirstOrDefault(x => x.Id == id);
            return user;
        }

        public User GetByIdAccount(int id)
        {
            var user = _context.User
                    .Include(x => x.Role)
                    .Include(x => x.Account)
                   .FirstOrDefault(x => x.AccountId == id);
            return user;
        }

        public void Delete(int id)
        {
            var userDelete = _context.User.Find(id);
            _context.User.Remove(userDelete);
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.User.Update(user);
            _context.SaveChanges();
        }

        public User GetByEmail(string email)
        {
            return _context.User.Find(email);
        }

        public List<User> GetAllByNameRole(string role)
        {
            var roleId = _context.Role.FirstOrDefault(x => x.Name == role).Id;
            return _context.User.Where(x => x.RoleId == roleId).ToList();
        }

        public async Task AddRole(Role role)
        {
            _context.Role.Add(role);
            await _context.SaveChangesAsync();
        }
    }
}