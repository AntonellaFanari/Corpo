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
    public class OutflowRepository: IOutflowRepository
    {
        CorpoContext _context;

        public OutflowRepository(CorpoContext context)
        {
            _context = context;
        }

        public void AddOutflow(Outflow outflow)
        {
            _context.Outflow.Add(outflow);
            _context.SaveChanges();
        }

        public void AddOutflowType(OutflowType outflowType)
        {
            _context.OutflowType.Add(outflowType);
            _context.SaveChanges();
        }

        public void DeleteOutflowType(int id)
        {
            var outflowType = _context.OutflowType.Find(id);
            _context.Remove(outflowType);
            _context.SaveChanges();
        }

        public void DeleteOutflow(int id)
        {
            var outflow = _context.Outflow.Find(id);
            _context.Remove(outflow);
            _context.SaveChanges();
        }
        public List<Outflow> GetAllOutflow()
        {
            return _context.Outflow.ToList();
        }

        public List<OutflowType> GetAllOutflowType()
        {
            return _context.OutflowType.ToList();
        }

        public Outflow GetOutflowById(int id)
        {
            return _context.Outflow.Include(x => x.OutflowType).FirstOrDefault(x=>x.Id == id);
        }

        public OutflowType GetOutflowTypeById(int id)
        {
            return _context.OutflowType.Find(id);
        }

        public void UpdateOutflowType(OutflowType outflowType)
        {
            _context.OutflowType.Update(outflowType);
            _context.SaveChanges();
        }
    }
}
