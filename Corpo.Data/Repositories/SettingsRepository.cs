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

        public Task<List<GeneralSetting>> GetAll()
        {
            return _context.GeneralSetting.ToListAsync();
        }

        public Task<GeneralSetting> GetByName(string name)
        {
            return _context.GeneralSetting.FirstOrDefaultAsync(x => x.Name == name);
        }

        public List<RoleAccess> GetRoleAccess()
        {
            return _context.RoleAccess.Include(x=>x.Role).ToList();
        }

        public void SaveAccess(List<RoleAccess> access)
        {
            _context.RoleAccess.RemoveRange(_context.RoleAccess.ToList());
            _context.SaveChanges();
            foreach (var ac in access)
            {
                _context.RoleAccess.Add(ac);
                _context.SaveChanges();
            }
            
           
        }

        public async Task Update(GeneralSetting setting)
        {
            _context.GeneralSetting.Update(setting);
            await _context.SaveChangesAsync();
        }
    }
}
