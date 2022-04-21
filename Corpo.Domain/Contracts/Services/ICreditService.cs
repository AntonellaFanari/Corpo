using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ICreditService
    {
        int Add(Credit credit);
        DomainResponse Update(Credit credit);
        Task<DomainResponse> UpdateRecharge(Credit credit);
        Task<DomainResponse> GetById(int id);
    }
}
