using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public DomainResponse Add(Product product)
        {
            _productRepository.Add(product);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse Delete(int id)
        {
            _productRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse GetAll()
        {
            var response = _productRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public Product GetById(int id)
        {
            return _productRepository.GetById(id);
        }

        public DomainResponse Update(int id, Product product)
        {
            _productRepository.Update(id, product);
            return new DomainResponse
            {
                Success = true
            };
        }
    }
}
