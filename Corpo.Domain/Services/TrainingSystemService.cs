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
    public class TrainingSystemService: ITrainingSystemService
    {
        private ITrainingSystemRepository _trainingSystemRepository;

        public TrainingSystemService(ITrainingSystemRepository trainingSystemRepository)
        {
            _trainingSystemRepository = trainingSystemRepository;
        }

        public async Task<DomainResponse> Add(TrainingSystem trainingSystem)
        {
            
            try
            {
                var trainingSystemExists = await _trainingSystemRepository.GetByUpByDown(trainingSystem.Up, trainingSystem.Down);
                if (trainingSystemExists == null)
                {
                    await _trainingSystemRepository.Add(trainingSystem);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "Ya se encuentra registrado el sistema de entrenamiento.", "El sistema de entrenamiento ya existe.");
                }
                
                
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el sistema de entrenamiento.");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _trainingSystemRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _trainingSystemRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _trainingSystemRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(int id, TrainingSystem trainingSystem)
        {
            try
            {
                var trainingSystemExists = await _trainingSystemRepository.GetByUpByDown(trainingSystem.Up, trainingSystem.Down);
                if (trainingSystemExists == null)
                {
                    var trainingSystemQuery = await _trainingSystemRepository.GetById(id);
                    trainingSystemQuery.Up = trainingSystem.Up;
                    trainingSystemQuery.Down = trainingSystem.Down;
                    await _trainingSystemRepository.Update(trainingSystemQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "Ya se encuentra registrado el sistema de entrenamiento.", "El sistema de entrenamiento ya existe.");
                }


            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el sistema de entrenamiento.");
            }
        }
    }
}
