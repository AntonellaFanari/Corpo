using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class SettingsService : ISettingsService
    {
        private ISettingsRepository _settingsRepository;

        public SettingsService(ISettingsRepository settingsRepository)
        {
            _settingsRepository = settingsRepository;
        }

        public DomainResponse GetRoleAcces()
        {
            var list = _settingsRepository.GetRoleAcces();
            return new DomainResponse
            {
                Success = true,
                Result = list
            };
        }

        public DomainResponse SaveAcces(List<RoleAcces> acces)
        {
            _settingsRepository.SaveAcces(acces);
            return new DomainResponse { Success = true };
        }
    }
}
