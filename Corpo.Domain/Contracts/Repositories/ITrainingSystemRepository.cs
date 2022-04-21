using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ITrainingSystemRepository
    {
        Task<List<TrainingSystem>> GetAll();
        Task Add(TrainingSystem trainingSystem);
        Task<TrainingSystem> GetByUpByDown(string up, string down);
        Task<TrainingSystem> GetById(int id);
        Task Update(TrainingSystem trainingSystem);
        Task Delete(int id);
    }
}
