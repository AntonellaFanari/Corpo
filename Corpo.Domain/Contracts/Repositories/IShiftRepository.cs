using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IShiftRepository
    {
        List<Shift> GetAll(DateTime from, DateTime to, int classId);
        void Add(Shift shift);
        Task<Shift> GetById(int id);
        void Update(Shift shift);
        void Delete(int id);
    }
}
