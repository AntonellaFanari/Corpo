using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IWodTemplateRepository
    {
        Task Add(WodTemplate wodTemplate);
        Task<List<WodTemplate>> GetAll();
        Task Update(WodTemplate wodTemplate);
        Task Delete(int id);
        Task<WodTemplate> GetById(int id);
    }
}
