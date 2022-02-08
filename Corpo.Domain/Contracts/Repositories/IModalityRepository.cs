using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IModalityRepository
    {
        Task<List<Modality>> GetAll();
        Task Delete(int id);
        Task Add(Modality modality);
        Task<Modality> GetById(int id);
        Task Update(Modality modality);
    }
}
