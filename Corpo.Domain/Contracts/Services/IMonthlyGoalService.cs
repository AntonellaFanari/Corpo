using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IMonthlyGoalService
    {
        Task<DomainResponse> Add(MonthlyGoal monthlyGoal);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(MonthlyGoal monthlyGoal);
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Delete(int id);
    }
}
