using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IClassRepository
    {
        void Add(Class newClass);
        List<Class> GetAll();
        Class GetById(int id);
        void Delete(int id);
        void Update(Class classEdit);
    }
}
