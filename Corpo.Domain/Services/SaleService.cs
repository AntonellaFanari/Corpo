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
    public class SaleService : ISaleService
    {
        private ISaleRepository _saleRepository;
        private IProductRepository _productRepository;
        private IBalanceService _balanceService;
        private ICashRepository _cashRepository;
        private IBalanceRepository _balanceRepository;

        public SaleService(ISaleRepository saleRepository, IProductRepository productRepository,
        IBalanceService balanceService, ICashRepository cashRepository, IBalanceRepository balanceRepository)
        {
            _saleRepository = saleRepository;
            _productRepository = productRepository;
            _balanceService = balanceService;
            _cashRepository = cashRepository;
            _balanceRepository = balanceRepository;
        }

        public DomainResponse GetAll(int id)
        {
            var cash = _cashRepository.GetById(id).Result;
            var response = _saleRepository.GetAll(cash.Opening, cash.Closing);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetDetailsSale(int idSale)
        {
            var response = _saleRepository.GetDetailsSale(idSale);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
        public DomainResponse Add(LoggedUser user, SaleDto sale)
        {
            var newSale = new Sale();
            newSale.Date = DateTime.Now;
            newSale.UserName = user.LastName + " " + user.Name;
            newSale.UserId = user.Id;
            newSale.MemberId = sale.MemberId;
            newSale.Total = sale.Total;
            newSale.Status = sale.Status;
            newSale.Pay = sale.Pay;
            newSale.DetailsSale = sale.DetailsSale;
            try
            {
                var idSale = _saleRepository.Add(newSale);
                if (sale.Balance != 0)
                {
                    var balance = new BalanceToPay();
                    balance.Date = DateTime.Now;
                    balance.MemberId = sale.MemberId;
                    balance.Transaction = sale.Transaction;
                    balance.transactionId = idSale;
                    balance.Balance = sale.Balance;
                    if (sale.Balance > 0)
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

                return new DomainResponse(false, ex.Message, "No se pudo agregar la venta");
            }

        }

        public async Task<DomainResponse> Cancel(int userId, int id, CancelSale cancelSale)
        {
            var cash = await _cashRepository.GetLastCash();
            var sale = _saleRepository.GetSaleById(id);
            cancelSale.Date = DateTime.Now;
            cancelSale.UserId = userId;
            _saleRepository.Cancel(id, cancelSale);
            var balance = await _balanceRepository.GetByIdTransaction(id, TransactionType.Sale);
            if (balance != null && balance.Statement == Statement.Paid)
            {
                if (cash.Closing != null)
                {
                    await _cashRepository.UpdateMonthlyCash(DateTime.Now, cancelSale.Total, "outflow");
                }
                else
                {
                    if (sale.Date < cash.Opening)
                    {
                        await _cashRepository.UpdateMonthlyCash(DateTime.Now, cancelSale.Total, "outflow");
                    }
                }
            }
            if (balance != null && balance.Statement == Statement.Unpaid)
            {
                var outflow = cancelSale.Total - balance.Balance + balance.Pay;
                if (cash.Closing != null)
                {
                    await _cashRepository.UpdateMonthlyCash(DateTime.Now, outflow, "outflow");
                }
                else
                {
                    if (sale.Date < cash.Opening)
                    {
                        await _cashRepository.UpdateMonthlyCash(DateTime.Now, outflow, "outflow");
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


        public DomainResponse GetCancelSale(int idSale)
        {
            var response = _saleRepository.GetCancelSale(idSale);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetSaleById(int idSale)
        {
            var response = _saleRepository.GetSaleById(idSale);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
