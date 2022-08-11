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
    public class BalancePaidService: IBalancePaidService
    {
        private IBalancePaidRepository _balancePaidRepository;
        private ICashRepository _cashRepository;
        private IBalanceRepository _balanceRepository;

        public BalancePaidService(IBalancePaidRepository balancePaidRepository, ICashRepository cashRepository, IBalanceRepository balanceRepository)
        {
            _balancePaidRepository = balancePaidRepository;
            _cashRepository = cashRepository;
            _balanceRepository = balanceRepository;
        }

        public async Task<DomainResponse> Add(BalancePaid balancePaid)
        {
            try
            {
                await _balancePaidRepository.Add(balancePaid);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "no se registro el pago.");
                throw;
            }
        }

        public async Task<DomainResponse> Cancel(int userId, CancelBalancePaid cancelBalancePaid)
        {
            var cash = await _cashRepository.GetLastCash();
            var balancePaid = await _balancePaidRepository.GetById(cancelBalancePaid.BalancePaidId);
            cancelBalancePaid.Date = DateTime.Now;
            cancelBalancePaid.UserId = userId;
            await _balancePaidRepository.Cancel(cancelBalancePaid);
            var balance = _balanceRepository.GetById(balancePaid.BalancesToPay[0].Id);
            if (balance != null && balance.Statement == Statement.Paid)
            {
                if (cash.Closing != null)
                {
                    await _cashRepository.UpdateMonthlyCash(DateTime.Now, cancelBalancePaid.Pay, "outflow");
                }
                else
                {
                    if (balancePaid.Date < cash.Opening)
                    {
                        await _cashRepository.UpdateMonthlyCash(DateTime.Now, cancelBalancePaid.Pay, "outflow");
                    }
                }
            }
            balance.Pay -= cancelBalancePaid.Pay;
            balance.Statement = Statement.Unpaid;
            _balanceRepository.Update(balance);
            //if (balance != null && balance.Statement == Statement.Unpaid)
            //{
            //    var outflow = cancelSale.Total - balance.Balance + balance.Pay;
            //    if (cash.Closing != null)
            //    {
            //        await _cashRepository.UpdateMonthlyCash(DateTime.Now, outflow, "outflow");
            //    }
            //    else
            //    {
            //        if (sale.Date < cash.Opening)
            //        {
            //            await _cashRepository.UpdateMonthlyCash(DateTime.Now, outflow, "outflow");
            //        }
            //    }
            //}
            //else
            //{

            //}
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll(int id)
        {
            var cash =  _cashRepository.GetById(id).Result;
            var response = _balancePaidRepository.GetAll(cash.Opening, cash.Closing);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _balancePaidRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetCancelById(int id)
        {
            var response = await _balancePaidRepository.GetCancelById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
