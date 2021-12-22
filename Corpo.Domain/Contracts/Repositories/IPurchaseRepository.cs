using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IPurchaseRepository
    {
        List<Purchase> GetAll();
        void Delete(int id);
        void DeleteDetailPurchase(int id);
        List<DetailPurchase> GetDetailPurchase(int id);
        void Add(Purchase purchase);
    }
}
