using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IIntensityService
    {
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Add(Intensity intensity);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(int id, Intensity intensity);
        Task<DomainResponse> Delete(int id);
    }
}
