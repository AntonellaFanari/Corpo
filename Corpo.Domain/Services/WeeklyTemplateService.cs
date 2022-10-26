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

                throw;
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
    }
}
