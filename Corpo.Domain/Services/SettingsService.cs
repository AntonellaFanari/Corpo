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

        public async Task<DomainResponse> Add(List<GeneralSetting> settings)
        {
            try
            {
                foreach (var setting in settings)
                {
                    await _settingsRepository.Add(setting);
                }
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudieron guardar las configuraciones.");
            }
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _settingsRepository.GetAll();
            if (response.Count == 0)
            {
                List<GeneralSetting> settings = new List<GeneralSetting>();
                settings.Add(new GeneralSetting() { Name = "timeLimitCancell" });
                settings.Add(new GeneralSetting() { Name = "maxNegative" });
                settings.Add(new GeneralSetting() { Name = "firstDayPlan" });
                await Add(settings);
                var responseSettings = await _settingsRepository.GetAll();
                return new DomainResponse
                {
                    Success = true,
                    Result = responseSettings
                };
            }
            else
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = response
                };
            }

        }

        public async Task<DomainResponse> GetRoleAccess()
        {
            var response = await _settingsRepository.GetRoleAccess();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse SaveAccess(List<RoleAccess> access)
        {
            _settingsRepository.SaveAccess(access);
            return new DomainResponse { Success = true };
        }

        public async Task<DomainResponse> Update(List<GeneralSetting> settings)
        {
            try
            {
                foreach (var setting in settings)
                {
                    await _settingsRepository.Update(setting);
                }
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar las configuraciones.");
            }
        }
    }
}
