using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ICashService
    {
        Task<DomainResponse> GetLastCash();
        Task<DomainResponse> GetMonthlyCash();
        Task<DomainResponse> UpdateCash(int id, Cash cash);
        Task<DomainResponse> Add();
    }
}
