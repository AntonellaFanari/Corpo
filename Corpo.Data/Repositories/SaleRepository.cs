using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
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

        public List<SaleFeeIncomeDto> GetAll(DateTime from, DateTime? to)
        {
            var list = new List<SaleFeeIncomeDto>();
            var listSale = _context.Sale.Include(x => x.Member)
                .Where(to != null ? (x => x.Date >= from && x.Date <= to) : (x => x.Date >= from))
                .Select(x => new SaleFeeIncomeDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Pay= x.Pay,
                    IncomeType = IncomeType.sale
                }).ToList();
            var listBalancePaid = _context.BalancePaid
                .Where(to != null ? (x => x.Date >= from && x.Date <= to && x.IncomeType == IncomeType.paySale) : (x => x.Date >= from && x.IncomeType == IncomeType.paySale))
                .Select(x => new SaleFeeIncomeDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Pay = x.Pay,
                    IncomeType = x.IncomeType
                }).ToList();
            foreach (var item in listSale)
            {
                list.Add(item);
            };
            foreach (var item in listBalancePaid)
            {
                list.Add(item);
            };
            return list.OrderBy(x => x.Date).ToList();

        }

        public List<DetailsSale> GetDetailsSale(int idSale)
        {
            return _context.DetailsSale.Where(x => x.SaleId == idSale).Include(x => x.Product).Include(x => x.Sale).ToList();
        }

        public int Add(Sale sale)
        {
            _context.Sale.Add(sale);
            _context.SaveChanges();
            foreach (var detailSale in sale.DetailsSale)
            {
                var product = _context.Product.Find(detailSale.ProductId);
                product.Stock -= detailSale.Quantity;
                _context.Product.Update(product);
                _context.SaveChanges();
            };
            return sale.Id;
        }

        public void Cancel(int id, CancelSale cancelSale)
        {
            var sale = _context.Sale.Find(id);
            sale.Status = Status.Canceled;
            sale.Pay *= -1;
            _context.Sale.Update(sale);
            _context.SaveChanges();
            _context.CancelSale.Add(cancelSale);
            _context.SaveChanges();
        }

        public CancelSale GetCancelSale(int idSale)
        {
            var cancelSale = _context.CancelSale.FirstOrDefault(x => x.SaleId == idSale);
            return cancelSale;
        }

        public Sale GetSaleById(int id)
        {
            return _context.Sale.Include(x => x.Member).Include(x => x.DetailsSale).ThenInclude(x => x.Product).FirstOrDefault(x => x.Id == id);
        }
    }
}
