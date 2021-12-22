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
    public class PurchaseService : IPurchaseService
    {
        private IPurchaseRepository _purchaseRepository;

        public PurchaseService(IPurchaseRepository purchaseRepository)
        {
            _purchaseRepository = purchaseRepository;
        }

        public DomainResponse GetAll()
        {
            var response = _purchaseRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse Delete(int id)
        {
            _purchaseRepository.Delete(id);
            _purchaseRepository.DeleteDetailPurchase(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse GetDetailPurchase(int id)
        {
            var response = _purchaseRepository.GetDetailPurchase(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse Add(Purchase purchase)
        {
           purchase.Date = DateTime.Now;
            try
            {
                _purchaseRepository.Add(purchase);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo agregar la compra");
            }
        }
    }
}
