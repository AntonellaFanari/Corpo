using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IBalancePaidRepository
    {
        Task<List<BalancePaid>> GetAll(DateTime from, DateTime? to);
        Task Add(BalancePaid balancePaid);
        Task<BalancePaid> GetById(int id);
        Task Cancel(CancelBalancePaid cancelBalancePaid);
        Task<CancelBalancePaid> GetCancelById(int id);
    }
}
