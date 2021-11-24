using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private CorpoContext _context;

        public ProductRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(Product product)
        {
            _context.Product.Add(product);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var product = _context.Product.Find(id);
            _context.Product.Remove(product);
            _context.SaveChanges();
        }

        public List<Product> GetAll()
        {
            return _context.Product.ToList();
        }

        public Product GetById(int id)
        {
            return _context.Product.Find(id);
        }

        public void Update(int id, Product product)
        {
            product.Id = id;
            _context.Product.Update(product);
            _context.SaveChanges();

        }

        //public void UpdateStock(int id, int quantity)
        //{
        //    var product = _context.Product.Find(id);
        //    product.
        //}
    }
}
