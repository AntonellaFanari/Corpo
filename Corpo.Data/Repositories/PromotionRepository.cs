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
    public class PromotionRepository: IPromotionRepository
    {
        private CorpoContext _context;

        public PromotionRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(Promotion promotion)
        {
            _context.Promotion.Add(promotion);
            _context.SaveChanges();
      
        }

        public void Delete(int id)
        {
            var promotion = _context.Promotion.Find(id);
            _context.Promotion.Remove(promotion);
            _context.SaveChanges();
        }

        public List<Promotion> GetAll()
        {
            return _context.Promotion.Include(x=>x.PromotionAnotherMember).ToList();
        }

        public Promotion GetById(int id)
        {
            return _context.Promotion.Include(x=>x.PromotionAnotherMember).FirstOrDefault(x=>x.Id == id);
        }

        public void Update(Promotion promotion)
        {
            _context.Promotion.Update(promotion);
            _context.SaveChanges();
        }
    }
}
