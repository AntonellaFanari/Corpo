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
    public class IntensityService: IIntensityService
    {
        private IIntensityRepository _intensityRepository;

        public IntensityService(IIntensityRepository intensityRepository)
        {
            _intensityRepository = intensityRepository;
        }

        public async Task<DomainResponse> Add(Intensity intensity)
        {
            
            try
            {
                var intensityExist = await _intensityRepository.GetByUpByDown(intensity.Up, intensity.Down);
                if (intensityExist == null)
                {
                    await _intensityRepository.Add(intensity);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "Ya se encuentra registrada la intensidad.", "La intensidad ya existe.");
                }
                
                
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar la intensidad.");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _intensityRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _intensityRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _intensityRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(int id, Intensity intensity)
        {
            try
            {
                var intensityExist = await _intensityRepository.GetByUpByDown(intensity.Up, intensity.Down);
                if (intensityExist == null)
                {
                    var intensityQuery = await _intensityRepository.GetById(id);
                    intensityQuery.Up = intensity.Up;
                    intensityQuery.Down = intensity.Down;
                    await _intensityRepository.Update(intensityQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "Ya se encuentra registrada la intensidad.", "La intensidad ya existe.");
                }


            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar la intensidad.");
            }
        }
    }
}
