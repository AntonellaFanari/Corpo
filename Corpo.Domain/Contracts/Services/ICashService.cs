using Corpo.Domain.Models;
using Corpo.Domain.Views;
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
        Task<DomainResponse> UpdateCash(LoggedUser user, int id, Cash cash);
        Task<DomainResponse> Add();
        Task<DomainResponse> GetCashCurrentMonth();
        Task<DomainResponse> GetCash(DateTime from, DateTime to);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> GetDetailed(DateTime opening, DateTime closing);
        Task<DomainResponse> GetByDate(DateTime date);
        Task<DomainResponse> GetAllMonthlyCash();
        Task<DomainResponse> GetRecordCashByMonth(int month);


    }

}
