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
    public class SettingsRepository : ISettingsRepository
    {
        private CorpoContext _context;

        public SettingsRepository(CorpoContext context)
        {
            _context = context;
        }

        public List<RoleAcces> GetRoleAcces()
        {
            return _context.RoleAcces.Include(x=>x.Role).ToList();
        }

        public void SaveAcces(List<RoleAcces> acces)
        {
            _context.RoleAcces.RemoveRange(_context.RoleAcces.ToList());
            _context.SaveChanges();
            foreach (var ac in acces)
            {
                _context.RoleAcces.Add(ac);
                _context.SaveChanges();
            }
            
           
        }
    }
}
