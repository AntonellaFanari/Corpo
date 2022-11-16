using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
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
        Task Update(WeeklyTemplate weeklyTemplate);
        Task Delete(int id);
    }
}
