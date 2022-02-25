using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IMonthlyGoalRepository
    {
        Task Add(MonthlyGoal monthlyGoal);
        Task<MonthlyGoal> GetById(int id);
        Task Update(MonthlyGoal monthlyGoal);
        Task<List<MonthlyGoal>> GetAll();
        Task Delete(int id);
    }
}
