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
    public class SaleService : ISaleService
    {
        private ISaleRepository _saleRepository;
        private IProductRepository _productRepository;
        private IBalanceService _balanceService;

        public SaleService(ISaleRepository saleRepository, IProductRepository productRepository, IBalanceService balanceService)
        {
            _saleRepository = saleRepository;
            _productRepository = productRepository;
            _balanceService = balanceService;
        }

        public DomainResponse GetAll()
        {
            var response = _saleRepository.GetAll();
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
        public DomainResponse Add(SaleDto sale)
        {
            var newSale = new Sale();
            newSale.Date = DateTime.Now;
            newSale.UserId = sale.UserId;
            newSale.MemberId = sale.MemberId;
            newSale.Total = sale.Total;
            newSale.Status = sale.Status;
            newSale.Pay = sale.Pay;
            newSale.DetailsSale = sale.DetailsSale;
            try
            {
                var id = _saleRepository.Add(newSale);
                if (sale.Balance != 0)
                {
                    var balance = new BalanceToPay();
                    balance.Date = DateTime.Now;
                    balance.MemberId = sale.MemberId;
                    balance.Transaction = sale.Transaction;
                    balance.transactionId = id;
                    balance.Balance = sale.Balance;
                    if (sale.Balance>0)
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

        public DomainResponse Cancel(int id, CancelSale cancelSale)
        {
            cancelSale.Date = DateTime.Now;
            _saleRepository.Cancel(id, cancelSale);
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
