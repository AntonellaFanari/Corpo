using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ISettingsService
    {
        DomainResponse SaveAccess(List<RoleAccess> access);
        Task<DomainResponse> GetRoleAccess();
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Update(List<GeneralSetting> settings);
        Task<DomainResponse> Add(List<GeneralSetting> settings);
    }
}
