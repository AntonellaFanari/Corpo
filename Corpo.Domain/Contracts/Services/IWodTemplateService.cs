using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IWodTemplateService
    {
        Task<DomainResponse> Add(WodTemplate wodTemplate);
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Update(WodTemplate wodTemplate);
        Task<DomainResponse> Delete(int id);
        Task<DomainResponse> GetById(int id);

    }
}
