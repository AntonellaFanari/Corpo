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
    public class PlanRepository: IPlanRepository
    {
        private CorpoContext _context;

        public PlanRepository(CorpoContext context)
        {
            _context = context;
        }

        public List<Plan> GetPlans()
        {
            return _context.Plan
                .Include(x=>x.Class).ToList();
        }

        public void Add(Plan newPlan)
        {
            foreach (var clase in newPlan.Class)
            {
                _context.Class.Attach(clase);
            };
            _context.Plan.Add(newPlan);
            _context.SaveChanges();
        }

        public Plan GetById(int id)
        {
            var listPlans = _context.Plan.Where(x => x.Id == id)
                .Include(x=>x.Class)
                .ToList();
            return listPlans.FirstOrDefault(x=>x.Id == id);
        }

        public void Update(Plan planEdit)
        {
            _context.Plan.Update(planEdit);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var plan = _context.Plan.Find(id);
            _context.Plan.Remove(plan);
            _context.SaveChanges();
        }
    }
}
