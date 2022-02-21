using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class FeeService : IFeeService
    {
        private IFeeRepository _feeRepository;
        private ICreditService _creditService;
        private IBalanceService _balanceService;
        private IMemberService _memberService;
        private ICashRepository _cashRepository;
        private IBalanceRepository _balanceRepository;
        private ICreditRepository _creditRepository;

        public FeeService(IFeeRepository feeRepository, ICreditService creditService, 
            IBalanceService balanceService, IMemberService memberService, ICashRepository cashRepository,
            IBalanceRepository balanceRepository, ICreditRepository creditRepository)
        {
            _feeRepository = feeRepository;
            _creditService = creditService;
            _balanceService = balanceService;
            _memberService = memberService;
            _cashRepository = cashRepository;
            _balanceRepository = balanceRepository;
            _creditRepository = creditRepository;

        }

        public DomainResponse Add(LoggedUser user, FeeDto feeDto)
        {
            try
            {
                feeDto.UserName = user.LastName + " " + user.Name;  
                var totalPromotion = feeDto.TotalPromotion;
                AddFee(feeDto, user.Id, totalPromotion, feeDto.MemberId);
                foreach (var member in feeDto.MembersPromotion)
                {
                    totalPromotion = feeDto.Total * member.Discount / 100;
                    AddFee(feeDto, user.Id, totalPromotion, member.MemberId);
                };
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo cargar las cuotas");
            }


        }

        private DomainResponse AddFee(FeeDto feeDto, int id, decimal totalPromotion, int memberId)
        {
            var credit = new Credit();
            credit.CreditConsumption = feeDto.CreditConsumption;
            credit.Expiration = feeDto.To;
            credit.InitialCredit = feeDto.InitialCredit;
            credit.Negative = feeDto.Negative;
            credit.Id = feeDto.CreditId;
            try
            {
                var date = DateTime.Now;
                var lastPayment = _feeRepository.GetLastPayment(feeDto.MemberId);
                var fee = new Fee();
                fee.Date = date;
                fee.UserName = feeDto.UserName;
                fee.UserId = id;
                fee.MemberId = memberId;
                fee.Credits = feeDto.Credits;
                fee.PlanName = feeDto.PlanName;
                fee.From = feeDto.From;
                fee.To = feeDto.To;
                fee.PromotionId = feeDto.PromotionId;
                fee.TotalPromotion = totalPromotion;
                fee.Total = feeDto.Total;
                fee.Pay = feeDto.Pay;
                var idFee = _feeRepository.Add(fee);
                if (lastPayment != null && lastPayment.Date < date.AddDays(-31))
                {
                    var member = _memberService.GetById(feeDto.MemberId);
                    member.ReEntryDate = date;
                    _memberService.Update(member.Id, member);
                };
                _creditService.UpdateRecharge(credit);
                if (feeDto.Balance != 0)
                {
                    var balance = new BalanceToPay();
                    balance.Date = DateTime.Now;
                    balance.MemberId = memberId;
                    balance.Transaction = feeDto.Transaction;
                    balance.transactionId = idFee;
                    balance.Balance = feeDto.Balance;
                    if (feeDto.Balance > 0)
                    {
                        balance.Statement = Statement.Unpaid;
                    }
                    else
                    {
                        balance.Statement = Statement.UnCompensated;
                    }
                    _balanceService.Add(balance);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse
                    {
                        Success = true
                    };
                }

            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo cargar la cuota.");
            }
        }

        public DomainResponse GetAll(int id)
        {
            var cash = _cashRepository.GetById(id).Result;
            var response = _feeRepository.GetAll(cash.Opening, cash.Closing);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetAllByIdMember(int id)
        {
            var response = _feeRepository.GetAllByIdMember(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public Fee GetById(int id)
        {
            return _feeRepository.GetById(id);
        }

        public async Task<DomainResponse> Delete(int id)
        {
            var fee = _feeRepository.GetById(id);
            var memberId = fee.MemberId;
            var cash = await _cashRepository.GetLastCash();
            var creditId = await _feeRepository.Delete(id);
            var lastFee = _feeRepository.GetLastPayment(memberId);
            var credit = await _creditRepository.GetById(creditId);
            credit.InitialCredit = 0;
            credit.CreditConsumption = 0;
            credit.Negative = 0;
            if (lastFee != null)
            {
                credit.Expiration = lastFee.To;
            }
            else
            {
                credit.Expiration = fee.Member.EntryDate;
            };
            _creditRepository.Update(credit);
            var balance = await _balanceRepository.GetByIdTransaction(id, TransactionType.Fee);
            if (balance == null)
            {
                if (cash.Closing != null)
                {
                    await _cashRepository.UpdateMonthlyCash(DateTime.Now, fee.Total, "outflow");
                }
                else
                {
                    if (fee.Date < cash.Opening)
                    {
                        await _cashRepository.UpdateMonthlyCash(DateTime.Now, fee.Total, "outflow");
                    }
                }
            }
            if (balance != null)
            {
                
                if (balance.Statement == Statement.Paid)
                {
                    if (cash.Closing != null)
                    {
                        await _cashRepository.UpdateMonthlyCash(DateTime.Now, fee.Total, "outflow");
                    }
                    else
                    {
                        if (fee.Date < cash.Opening)
                        {
                            await _cashRepository.UpdateMonthlyCash(DateTime.Now, fee.Total, "outflow");
                        }
                    }
                }
                if (balance.Statement == Statement.Unpaid)
                {
                    var outflow = fee.Total - balance.Balance + balance.Pay;
                    if (cash.Closing != null)
                    {
                        await _cashRepository.UpdateMonthlyCash(DateTime.Now, outflow, "outflow");
                    }
                    else
                    {
                        if (fee.Date < cash.Opening)
                        {
                            await _cashRepository.UpdateMonthlyCash(DateTime.Now, outflow, "outflow");
                        }
                    }
                }
                
            }
            else
            {

            }
            return new DomainResponse
            {
                Success = true
            };
        }
    }
}
