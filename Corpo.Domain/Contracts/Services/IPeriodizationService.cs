using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IPeriodizationService
    {
        Task<DomainResponse> Add(Periodization periodization);
        Task<DomainResponse> Update(Periodization periodization);
        Task<DomainResponse> GetValidByMemberId(int id);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> GetByYear(int year, int id);
    }
}
