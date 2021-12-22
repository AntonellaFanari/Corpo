using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class PurchaseRepository : IPurchaseRepository
    {
        private CorpoContext _context;

        public PurchaseRepository(CorpoContext context)
        {
            _context = context;
        }

        public List<Purchase> GetAll()
        {
            return _context.Purchase
                    .Include(x => x.DetailPurchase)
                    .Include(x=> x.User)
                    .ToList();
        }

        public void Delete(int id)
        {
            var purchase = _context.Purchase.Find(id);
            _context.Purchase.Remove(purchase);
            _context.SaveChanges();
        }

        public void DeleteDetailPurchase(int id)
        {
            var listDetail = _context.DetailPurchase.Where(x=> x.PurchaseId == id).ToList();
            foreach (var item in listDetail)
            {
                _context.DetailPurchase.Remove(item);
                _context.SaveChanges();
            }
        }

        public List<DetailPurchase> GetDetailPurchase(int id)
        {
            return _context.DetailPurchase
                .Where(x => x.PurchaseId == id)
                .Include(x => x.Product)
                .ToList();
        }

        public void Add(Purchase purchase)
        {
            _context.Purchase.Add(purchase);
            _context.SaveChanges();
            foreach (var detailPurchase in purchase.DetailPurchase)
            {
                var product = _context.Product.Find(detailPurchase.ProductId);
                product.Stock += detailPurchase.Quantity;
                _context.Update(product);
                _context.SaveChanges();
            }
        }
    }
}
