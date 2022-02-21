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
    public class PeriodizationService: IPeriodizationService
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
                var validPeriodization = await _periodizationRepository.GetValidByMemberId(periodization.MemberId);               
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
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar la periodización.");
            }
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

        public async Task<DomainResponse> Update(Periodization periodization)
        {
            try
            {
                var periodizationQuery = await _periodizationRepository.GetById(periodization.Id);
                periodizationQuery.MemberId = periodization.MemberId;
                periodizationQuery.Month = periodization.Month;
                periodizationQuery.Year = periodizationQuery.Year;
                periodizationQuery.Valid = periodization.Valid;
                periodizationQuery.PeriodizationWeeks = periodization.PeriodizationWeeks;
                await _periodizationRepository.Update(periodizationQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la periodización.");
            }
        }
    }
}
