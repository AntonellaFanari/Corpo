using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IWeeklyGoalService
    {
        Task<DomainResponse> Add(WeeklyGoal weeklyGoal);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(WeeklyGoal weeklyGoal);
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Delete(int id);
    }
}
