using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IWeeklyGoalRepository
    {
        Task Add(WeeklyGoal weeklyGoal);
        Task<WeeklyGoal> GetById(int id);
        Task Update(WeeklyGoal weeklyGoal);
        Task<List<WeeklyGoal>> GetAll();
        Task Delete(int id);
    }
}
