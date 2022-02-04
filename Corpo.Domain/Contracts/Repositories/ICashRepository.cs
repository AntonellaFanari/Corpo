using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ICashRepository
    {
        Task<Cash> GetLastCash();
        Task<MonthlyCash> GetMonthlyCash(DateTime date);
        Task<Cash> GetById(int id);
        Task UpdateMonthlyCash(DateTime date, decimal amount, string type);
        Task<MonthlyCash> AddMonthlyCash();
        Task UpdateCash(Cash cash);
        Task AddCash(Cash cash);
    }
}
