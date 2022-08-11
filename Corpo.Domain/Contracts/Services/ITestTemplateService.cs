using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ITestTemplateService
    {
        Task<DomainResponse> GetAll();
        Task<DomainResponse> Add(TestTemplate test);
        Task<DomainResponse> Delete(int id);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(TestTemplate test);
        Task<DomainResponse> GetAllExercisesFMS();
        Task<DomainResponse> GetDetailById(int id);
    }
}
