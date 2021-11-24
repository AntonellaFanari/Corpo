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

            _saleRepository.Add(sale);
            //var detailSale = _saleRepository.GetDetailsSale(sale.Id);
            //foreach (var detail in detailSale)
            //{
            //    _productRepository.Update(detail.ProductId,)
            //}
            return new DomainResponse
            {
                Success = true
            };
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
