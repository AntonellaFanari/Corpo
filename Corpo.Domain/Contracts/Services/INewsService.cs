using Corpo.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface INewsService
    {
        Task<DomainResponse> GetAll();
        DomainResponse Add(News news, IFormFileCollection files);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> Update(News news, IFormFileCollection files);
        DomainResponse Delete(int id);
    }
}
