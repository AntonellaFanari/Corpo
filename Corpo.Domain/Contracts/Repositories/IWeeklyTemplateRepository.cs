using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IWeeklyTemplateRepository
    {
        Task Add(WeeklyTemplate weeklyTemplate);
        Task<List<WeeklyTemplate>> GetAll();
        Task<WeeklyTemplate> GetById(int id);
    }
}
