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
    public class WeeklyTemplateService: IWeeklyTemplateService
    {
        private IWeeklyTemplateRepository _weeklyTemplateRepository;

        public WeeklyTemplateService(IWeeklyTemplateRepository weeklyTemplateRepository)
        {
            _weeklyTemplateRepository = weeklyTemplateRepository;
        }

        public async Task<DomainResponse> Add(WeeklyTemplate weeklyTemplate)
        {
            try
            {

                await _weeklyTemplateRepository.Add(weeklyTemplate);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo agregar la plantilla semanal.");
            }
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _weeklyTemplateRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _weeklyTemplateRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(WeeklyTemplate weeklyTemplate, int id)
        {
            try
            {
                var weeklyTemplateQuery = await _weeklyTemplateRepository.GetById(id);
                weeklyTemplateQuery.Name = weeklyTemplate.Name;
                weeklyTemplateQuery.Goal = weeklyTemplate.Goal;
                weeklyTemplateQuery.WeeklyWodTemplates = weeklyTemplate.WeeklyWodTemplates;
                await _weeklyTemplateRepository.Update(weeklyTemplateQuery);
                return new DomainResponse
                {
                    Success = true,
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la plantilla semanal.");
            }

        }
        public async Task<DomainResponse> Delete(int id)
        {
            try
            {

                await _weeklyTemplateRepository.Delete(id);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo eliminar la plantilla.");
            }
        }

    }
}
