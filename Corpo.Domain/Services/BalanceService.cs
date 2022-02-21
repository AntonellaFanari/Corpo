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
    public class BalanceService: IBalanceService
    {
        private IBalanceRepository _balanceRepository;

        public BalanceService(IBalanceRepository balanceRepository)
        {
            _balanceRepository = balanceRepository;
        }

        public DomainResponse Add(BalanceToPay balance)
        {
            try
            {
                _balanceRepository.Add(balance);
                return new DomainResponse
                {
                    Success = true
                };

            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo registrar el saldo.");
            }
        }

        public DomainResponse GetAll()
        {
            var response = _balanceRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetAllByIdMember(int id)
        {
            var response = _balanceRepository.GetAllByIdMember(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetById(int id)
        {
            var response = _balanceRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetPositiveBalanceByIdMember(int id)
        {
            var response = _balanceRepository.GetPositiveBalanceByIdMember(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };

        }

        public DomainResponse Update(int id, BalanceToPay balance)
        {
            var balanceQuery = _balanceRepository.GetById(id);
            if (balanceQuery.Balance != balance.Balance)
            {
                try
                {
                    balanceQuery.Balance = balance.Balance;
                    _balanceRepository.Update(balanceQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    return new DomainResponse(false, ex.Message, "No se pudo modificar el saldo.");
                }
            }
            else
            {
                return null;
            }
        }

        public DomainResponse CancelBalance(PayCancelBalanceDto payCancelBalance)
        {
            var payBalance = payCancelBalance.Pay + payCancelBalance.PositiveBalance;
            var listBalances = _balanceRepository.GetAllNegativeBalanceByIdMember(payCancelBalance.Id);
            var i = 0;
            try
            {
                do
                {

                    var idBalance = listBalances[i].Id;
                    if (listBalances[i].Balance <= payBalance)
                    {
                        listBalances[i].Statement = Statement.Paid;
                        listBalances[i].Pay = listBalances[i].Balance;
                        _balanceRepository.Update(listBalances[i]);
                        payBalance -= listBalances[i].Balance;
                    }
                    else
                    {
                        listBalances[i].Pay = payBalance;
                        _balanceRepository.Update(listBalances[i]);
                        payBalance -= payBalance;
                    }

                    i = i + 1;
                } while ((i < listBalances.Count) && (payBalance > 0));
                if (payCancelBalance.PositiveBalance<0)
                {
                    var positiveBalance = _balanceRepository.GetPositiveBalanceByIdMember(payCancelBalance.Id);
                    positiveBalance.Statement = Statement.Compensated;
                    _balanceRepository.Update(positiveBalance);
                };
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo cancelar el saldo");
            }
         
            
        }

        public async Task<DomainResponse> GetByIdTransaction(int id, TransactionType transactionType)
        {
            var response = await _balanceRepository.GetByIdTransaction(id, transactionType);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
