using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IIncomeRepository
    {
        Task Add(Income income);
        Task<List<Income>> GetAll(DateTime from, DateTime? to);
        Task<Income> GetById(int id);
        Task Delete(int id);
    }
}
