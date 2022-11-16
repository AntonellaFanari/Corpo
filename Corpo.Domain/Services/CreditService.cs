using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class CreditService : ICreditService
    {
        private ICreditRepository _creditRepository;
        private IAttendanceRepository _attendanceRepository;
        public CreditService(ICreditRepository creditRepository, IAttendanceRepository attendanceRepository)
        {
            _creditRepository = creditRepository;
            _attendanceRepository = attendanceRepository;
        }

        public int Add(Credit credit)
        {

            var id = _creditRepository.Add(credit);
            return id;
        }

        async public Task<DomainResponse> GetById(int id)
        {
            var response = await _creditRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async  Task<DomainResponse> UpdateRecharge(Credit credit)
        {
            var creditQuery = await _creditRepository.GetById(credit.Id);
            creditQuery.Expiration = credit.Expiration;
            creditQuery.FirstDay = credit.FirstDay;
            creditQuery.InitialCredit = credit.InitialCredit;
            creditQuery.Negative = credit.Negative;
            try
            {
                await _creditRepository.Update(creditQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo cargar los creditos.");
            }
        }
        public async Task<DomainResponse> Update(Credit credit)
        {
         
            try
            {
                if (credit.Expiration < DateTime.Now || (credit.InitialCredit == credit.CreditConsumption && credit.FirstDay != "true"))
                {
                    credit.Negative++;
                }
                else if(credit.Expiration >= DateTime.Now && (credit.InitialCredit > credit.CreditConsumption && credit.FirstDay != "true"))
                {

                    credit.CreditConsumption++;
                }
                await _creditRepository.Update(credit);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo descontar los creditos.");
            }
        }
    }
}
