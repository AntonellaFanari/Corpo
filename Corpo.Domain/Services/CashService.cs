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
    public class CashService : ICashService
    {
        private ICashRepository _cashRepository;

        public CashService(ICashRepository cashRepository)
        {
            _cashRepository = cashRepository;
        }

        public async Task<DomainResponse> Add()
        {
            var cashQuery = await _cashRepository.LastCash();
            var cash = new Cash
            {
                Opening = DateTime.Now,
                StartingBalance = cashQuery.EndingBalance
            };
            try
            {
                await _cashRepository.AddCash(cash);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo realizar la apertura de la caja.");
            }
        }

        public async Task<DomainResponse> LastCash()
        {
            var response = await _cashRepository.LastCash();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };


        }

        public async Task<DomainResponse> MonthlyCash()
        {
            var date = DateTime.Now;
            var response = await _cashRepository.MonthlyCash(date);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> UpdateCash(int id, Cash cash)
        {
            var cashQuery = await _cashRepository.ById(id);
            cashQuery.Closing = DateTime.Now;
            cashQuery.TotalFee = cash.TotalFee;
            cashQuery.TotalSale = cash.TotalSale;
            cashQuery.TotalOutflow = cash.TotalOutflow;
            cashQuery.TotalWithdrawal = cash.TotalWithdrawal;
            cashQuery.TotalIncome = cash.TotalIncome;
            cashQuery.EndingBalance = (cashQuery.StartingBalance + cashQuery.TotalSale + cashQuery.TotalFee + cashQuery.TotalIncome)
                - (cashQuery.TotalOutflow + cashQuery.TotalWithdrawal);
            try
            {
                await _cashRepository.UpdateCash(cashQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "Error al intentar cerrar la caja.");
            }
            
            
        }
    }
}
