using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
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
        Task<List<Cash>> GetCashCurrentMonth();
        Task<List<Cash>> GetCash(DateTime from, DateTime to);
        //Task<List<RecordCashDto>> GetDetailed(DateTime opening, DateTime closing);
    }
}
