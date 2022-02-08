using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IModalityService
    {
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Delete(int id);
        Task<DomainResponse> Add(Modality modality);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(int id, Modality modality);

    }
}
