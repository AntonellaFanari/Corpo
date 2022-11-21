using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ISettingsRepository
    {
        void SaveAccess(List<RoleAccess> access);
        Task<List<RoleAccess>> GetRoleAccess();
        Task<List<GeneralSetting>> GetAll();
        Task Update(GeneralSetting setting);
        Task<GeneralSetting> GetByName(string name);
        Task Add(GeneralSetting setting);
    }
}
