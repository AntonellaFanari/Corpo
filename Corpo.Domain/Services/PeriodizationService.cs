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
    public class PeriodizationService : IPeriodizationService
    {
        private IPeriodizationRepository _periodizationRepository;

        public PeriodizationService(IPeriodizationRepository periodizationRepository)
        {
            _periodizationRepository = periodizationRepository;
        }

        public async Task<DomainResponse> Add(Periodization periodization)
        {
            try
            {
                var periodizationExists = await _periodizationRepository.GetExists(periodization.Year, periodization.Month, periodization.MemberId);
                var validPeriodization = await _periodizationRepository.GetValidByMemberId(periodization.MemberId);
                if (periodizationExists != null)
                {
                    return new DomainResponse(false, "No se puede guardar la periodización.", "Ya existe una periodización registrada para este periodo.");
                }
                else
                {
                    periodization.Valid = true;
                    await _periodizationRepository.Add(periodization);
                    if (validPeriodization != null)
                    {
                        validPeriodization.Valid = false;
                        await _periodizationRepository.Update(validPeriodization);
                    };
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar la periodización.");
            }
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _periodizationRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetPeriodizationWeek(int id)
        {
            var response = await _periodizationRepository.GetByPeriodizationWeek(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetByYear(int year, int id)
        {
            if (year == 0)
            {
                year = DateTime.Now.Year;
            }
            var response = await _periodizationRepository.GetByYear(year, id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetValidByMemberId(int id)
        {
            var response = await _periodizationRepository.GetValidByMemberId(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(int id, Periodization periodization)
        {

            try
            {
                var periodizationExists = await _periodizationRepository.GetExists(periodization.Year, periodization.Month, periodization.MemberId);
                if (periodizationExists != null && periodizationExists.Id != periodization.Id)
                {
                    return new DomainResponse(false, "No se puede guardar la periodización.", "Ya existe una periodización registrada para este periodo.");
                }
                else
                {
                    var periodizationQuery = await _periodizationRepository.GetById(id);
                    periodizationQuery.Goal = periodization.Goal;
                    periodizationQuery.MemberId = periodization.MemberId;
                    periodizationQuery.Valid = periodization.Valid;
                    periodizationQuery.Trainings = periodization.Trainings;
                    periodizationQuery.Year = periodization.Year;
                    periodizationQuery.Month = periodization.Month;
                    periodizationQuery.Volume = periodization.Volume;
                    periodizationQuery.TrainingSystem = periodization.TrainingSystem;
                    periodizationQuery.PeriodizationWeeks = periodization.PeriodizationWeeks;
                    await _periodizationRepository.Update(periodizationQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la periodización.");
            }
        }
    }
}
