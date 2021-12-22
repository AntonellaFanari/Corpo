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
    public class SaleService : ISaleService
    {
        private ISaleRepository _saleRepository;
        private IProductRepository _productRepository;

        public SaleService(ISaleRepository saleRepository, IProductRepository productRepository)
        {
            _saleRepository = saleRepository;
            _productRepository = productRepository;
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
        public DomainResponse Add(Sale sale)
        {
            sale.Date = DateTime.Now;
            try
            {
                _saleRepository.Add(sale);
                return new DomainResponse
                {
                    Success = true
                };
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
    }
}
