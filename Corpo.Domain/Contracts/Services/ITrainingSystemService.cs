using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ITrainingSystemService
    {
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Add(TrainingSystem trainingSystem);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(int id, TrainingSystem trainingSystem);
        Task<DomainResponse> Delete(int id);
    }
}
