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
    public class SaleRepository: ISaleRepository
    {
        private CorpoContext _context;

        public SaleRepository(CorpoContext context)
        {
            _context = context;
        }

        public List<Sale> GetAll()
        {
            return _context.Sale.Include(x=>x.Member).ToList();
        }

        public List<DetailsSale> GetDetailsSale(int idSale)
        {
            return _context.DetailsSale.Where(x=>x.SaleId == idSale).Include(x => x.Product).Include(x=>x.Sale).ToList();
        }

        public int Add(Sale sale)
        {
            _context.Sale.Add(sale);
            _context.SaveChanges();
            foreach (var detailSale in sale.DetailsSale)
            {
                var product = _context.Product.Find(detailSale.ProductId);
                product.Stock -= detailSale.Quantity;
                _context.Update(product);
                _context.SaveChanges();
            };
            return sale.Id;
        }

        public void Cancel(int id, CancelSale cancelSale )
        {
            var sale = _context.Sale.Find(id);
            sale.Status = Status.Canceled;
            _context.Sale.Update(sale);
            _context.SaveChanges();
            _context.CancelSale.Add(cancelSale);
            _context.SaveChanges();
        }

        public CancelSale GetCancelSale(int idSale)
        {
            var cancelSale = _context.CancelSale.FirstOrDefault(x=>x.SaleId == idSale);
            return cancelSale;
        }

        public Sale GetSaleById(int id)
        {
            return _context.Sale.Include(x=>x.Member).FirstOrDefault(x=>x.Id == id);
        }
    }
}
