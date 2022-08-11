using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IBalancePaidService
    {
        Task<DomainResponse> GetAll(int id);
        Task<DomainResponse> Add(BalancePaid balancePaid);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Cancel(int userId, CancelBalancePaid cancelBalancePaid);
        Task<DomainResponse> GetCancelById(int id);
    }
}
