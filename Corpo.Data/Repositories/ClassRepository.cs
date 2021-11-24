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
    public class ClassRepository: IClassRepository
    {
        private CorpoContext _context;

        public ClassRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(Class newClass)
        {
            _context.Class.Add(newClass);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var clas = _context.Class.Find(id);
            _context.Class.Remove(clas);
            _context.SaveChanges();
        }

        public List<Class> GetAll()
        {
            var list = _context.Class.ToList();
            return list;
        }
        
        public Class GetById(int id)
        {
            var clas = _context.Class.Find(id);
            return clas;
        }

        public void Update(Class classEdit)
        {
            _context.Class.Update(classEdit);
            _context.SaveChanges();
        }
    }
}
