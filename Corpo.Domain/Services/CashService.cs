using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Views;
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
        private IWithdrawalRepository _withdrawalRepository;

        public CashService(ICashRepository cashRepository, IWithdrawalRepository withdrawalRepository)
        {
            _cashRepository = cashRepository;
            _withdrawalRepository = withdrawalRepository;
        }

        public async Task<DomainResponse> Add()
        {

            try
            {
                var cash = new Cash();
                cash.Opening = DateTime.Now;
                var cashQuery = await _cashRepository.GetLastCash();
                if (cashQuery != null)
                {
                    cash.StartingBalance = cashQuery.StartingBalance;
                }
                else { cash.StartingBalance = 0; }
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

        public async Task<DomainResponse> GetAllMonthlyCash()
        {
            var response = await _cashRepository.GetAllMonthlyCash();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetByDate(DateTime date)
        {
            var cash = await _cashRepository.GetByDate(date);
            if (cash != null)
            {

                return new DomainResponse
                {
                    Success = true,
                    Result = cash
                };
            }
            else
            {
                return new DomainResponse(false, "no existe caja registrada para esta fecha.", "no existen movimientos registrados para esta fecha.");
            }


        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _cashRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetCash(DateTime from, DateTime to)
        {
            var response = await _cashRepository.GetCash(from, to);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetCashCurrentMonth()
        {
            var response = await _cashRepository.GetCashCurrentMonth();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetDetailed(DateTime opening, DateTime closing)
        {
            var response = await _cashRepository.GetDetailed(opening, closing);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetLastCash()
        {
            var response = await _cashRepository.GetLastCash();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };


        }

        public async Task<DomainResponse> GetMonthlyCash()
        {
            var date = DateTime.Now;
            var response = await _cashRepository.GetMonthlyCash(date);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetRecordCashByMonth(int month)
        {
            var response = await _cashRepository.GetRecordCashByMonth(month);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> UpdateCash(LoggedUser user, int id, Cash cash)
        {
            var cashQuery = await _cashRepository.GetById(id);
            cashQuery.Closing = DateTime.Now;
            cashQuery.UserName = user.LastName + " " + user.Name;
            cashQuery.UserId = user.Id;
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
