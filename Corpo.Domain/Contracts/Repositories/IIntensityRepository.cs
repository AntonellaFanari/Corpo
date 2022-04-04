using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IIntensityRepository
    {
        Task<List<Intensity>> GetAll();
        Task Add(Intensity intensity);
        Task<Intensity> GetByUpByDown(string up, string down);
        Task<Intensity> GetById(int id);
        Task Update(Intensity intensity);
        Task Delete(int id);
    }
}
