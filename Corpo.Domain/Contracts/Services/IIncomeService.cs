using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IIncomeService
    {
        Task<DomainResponse> Add(int id, Income income);
        Task<DomainResponse> GetAll(int id);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Delete(int id);
        
    }
}
