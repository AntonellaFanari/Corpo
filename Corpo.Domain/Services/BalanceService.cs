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
    public class BalanceService : IBalanceService
    {
        private IBalanceRepository _balanceRepository;
        private IBalancePaidRepository _balancePaidRepository;

        public BalanceService(IBalanceRepository balanceRepository, IBalancePaidRepository balancePaidRepository)
        {
            _balanceRepository = balanceRepository;
            _balancePaidRepository = balancePaidRepository;
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

        private decimal Cancel(int userId, int memberId, decimal pay)
        {
            var listBalances = _balanceRepository.GetAllNegativeBalanceByIdMember(memberId);
            foreach (var balance in listBalances)
            {

                decimal payCurrent = balance.Balance - balance.Pay;
                var balancePaid = new BalancePaid();
                balancePaid.Date = DateTime.Now;
                balancePaid.MemberId = memberId;
                balancePaid.UserId = userId;
                balancePaid.Status = Status.Valid;
                balancePaid.BalancesToPay = new List<BalanceToPay>();
                balancePaid.IncomeType = (balance.Transaction == TransactionType.Sale) ? IncomeType.paySale : IncomeType.payFee;
                balancePaid.Pay = payCurrent;

                balance.Statement = Statement.Paid;
                balance.Pay += payCurrent;
                balancePaid.BalancesToPay.Add(balance);
                _balanceRepository.Update(balance);
                _balancePaidRepository.Add(balancePaid);
                pay -= payCurrent;
            }

            //if (pay < 0)
            //{
            //    pay *= -1;
            //};


            //var listBalances = _balanceRepository.GetAllNegativeBalanceByIdMember(memberId);
            //var i = 0;
            //do
            //{
                

            //    var idBalance = listBalances[i].Id;
            //    if (listBalances[i].Balance <= pay)
            //    {
            //        listBalances[i].Statement = Statement.Paid;
            //        listBalances[i].Pay = listBalances[i].Balance;
            //        _balanceRepository.Update(listBalances[i]);
            //        balancePaid.Pay = pay;
            //        _balancePaidRepository.Add(balancePaid);
            //        pay -= listBalances[i].Balance;
            //    }
            //    else
            //    {
            //        listBalances[i].Pay = pay;
            //        _balanceRepository.Update(listBalances[i]);
            //        balancePaid.Pay = pay;
            //        pay -= pay;
            //        _balancePaidRepository.Add(balancePaid);
            //    }
            //    balancePaid.BalancesToPay.Add(listBalances[i]);

            //    i = i + 1;
            //} while ((i < listBalances.Count) && (pay > 0));

            
            return pay;
        }

        public async Task<DomainResponse> CancelBalance(int userId, int memberId, decimal pay)
        {
           

            try
            {
                var response = this.Cancel(userId, memberId, pay);

                return new DomainResponse
                {
                    Success = true,
                    Result =  response
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

        public Task BalanceAnalyse(int userId, BalanceToPay balance)
        {
            var balancePositive = _balanceRepository.GetPositiveBalanceByIdMember(balance.MemberId);

            if (balance.Balance > 0)
            {

                if (balancePositive != null)
                {
                    if (balance.Balance > balancePositive.Balance * -1)
                    {
                        balancePositive.Statement = Statement.Compensated;
                        _balanceRepository.Update(balancePositive);
                        balance.Balance = balance.Balance + balancePositive.Balance;
                        _balanceRepository.Add(balance);
                    }
                    else if (balance.Balance == balancePositive.Balance * -1)
                    {
                        balancePositive.Statement = Statement.Compensated;
                        _balanceRepository.Update(balancePositive);
                    }
                    else
                    {
                        balancePositive.Balance = (balancePositive.Balance * -1) - balance.Balance;
                        _balanceRepository.Update(balancePositive);
                    }
                }
                else
                {
                    _balanceRepository.Add(balance);
                }

            }
            else
            {
                if (balancePositive != null)
                {
                    balancePositive.Balance += balance.Balance;
                    _balanceRepository.Update(balance);
                }
                else
                {
                    var listBalances = _balanceRepository.GetAllNegativeBalanceByIdMember(balance.MemberId);
                    if (listBalances.Count > 0)
                    {
                        var positive = this.Cancel(userId, balance.MemberId, balance.Balance);
                        if(positive != 0)
                        {
                            balance.Balance = positive * (-1);
                            balance.Statement = Statement.UnCompensated;
                            _balanceRepository.Add(balance);
                        }
                    }
                    else
                    {
                        _balanceRepository.Add(balance);
                    }

                }


            }
            return Task.CompletedTask;
        }
    }
}
