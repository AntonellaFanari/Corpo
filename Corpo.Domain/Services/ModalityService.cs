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
    public class ModalityService: IModalityService
    {
        private IModalityRepository _modalityRepository;

        public ModalityService(IModalityRepository modalityRepository)
        {
            _modalityRepository = modalityRepository;
        }

        public async Task<DomainResponse> Add(Modality modality)
        {
            try
            {
                await _modalityRepository.Add(modality);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar la modalidad.");
            }
            
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _modalityRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _modalityRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _modalityRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(int id, Modality modality)
        {
            var modalityQuery = await _modalityRepository.GetById(id);
            modalityQuery.Name = modality.Name;
            modalityQuery.Unit = modality.Unit;
            try
            {
                await _modalityRepository.Update(modalityQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la modalidad.");
            }
        }
    }
}
