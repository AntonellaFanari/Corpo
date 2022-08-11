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
    public class WodTemplateService : IWodTemplateService
    {
        private IWodTemplateRepository _wodTemplateRepository;

        public WodTemplateService(IWodTemplateRepository wodTemplateRepository)
        {
            _wodTemplateRepository = wodTemplateRepository;
        }

        public async Task<DomainResponse> Add(WodTemplate wodTemplate)
        {
            try
            {
                await _wodTemplateRepository.Add(wodTemplate);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo agregar el Wod");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _wodTemplateRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _wodTemplateRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _wodTemplateRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(WodTemplate wodTemplate)
        {
            try
            {
                var wodTemplateQuery = await _wodTemplateRepository.GetById(wodTemplate.Id);
                wodTemplateQuery.Name = wodTemplate.Name;
                wodTemplateQuery.Goal = wodTemplate.Goal;
                wodTemplateQuery.WodGroups = wodTemplate.WodGroups;
                await _wodTemplateRepository.Update(wodTemplateQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo modificar el Wod");
            }
        }
    }
}
