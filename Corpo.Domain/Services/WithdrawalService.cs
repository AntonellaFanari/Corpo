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
    public class WithdrawalService: IWithdrawalService
    {
        private IWithdrawalRepository _withdrawalRepository;

        public WithdrawalService(IWithdrawalRepository withdrawalRepository)
        {
            _withdrawalRepository = withdrawalRepository;
        }

        //withdrawalName
        public DomainResponse AddWithdrawalName(WithdrawalName withdrawalName)
        {
            try
            {
                _withdrawalRepository.AddWithdrawalName(withdrawalName);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo guardar el nombre del retiro.");
            }
        }

        public DomainResponse DeleteWithdrawalName(int id)
        {
            _withdrawalRepository.DeleteWithdrawalName(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        async public Task<DomainResponse> GetAllWithdrawalName()
        {
            var response = await _withdrawalRepository.GetAllWithdrawalName();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> GetWithdrawalNameById(int id)
        {
            var response = await _withdrawalRepository.GetWithdrawalNameById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> UpdateWithdrawalName(int id, WithdrawalName withdrawalName)
        {
            try
            {
                var withdrawalNameQuery = await _withdrawalRepository.GetWithdrawalNameById(id);
                withdrawalNameQuery.Name = withdrawalName.Name;
                _withdrawalRepository.UpdateWithdrawalName(withdrawalNameQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo modificar el nombre del retiro.");
            }
            
            
        }

        //withdrawal
        async public Task<DomainResponse> GetAllWithdrawal()
        {
            var response = await _withdrawalRepository.GetAllWithdrawal();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse AddWithdrawal(Withdrawal withdrawal)
        {
            try
            {
                withdrawal.Date = DateTime.Now;
                _withdrawalRepository.AddWithdrawal(withdrawal);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo registar el retiro.");
            }
        }

        async public Task<DomainResponse> GetWithdrawalById(int id)
        {
            var response = await _withdrawalRepository.GetWithdrawalById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse DeleteWithdrawal(int id)
        {
            _withdrawalRepository.DeleteWithdrawal(id);
            return new DomainResponse
            {
                Success = true
            };
        }
    }
}
