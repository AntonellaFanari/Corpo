using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IFeeService
    {
        Task<DomainResponse> Add(LoggedUser user, FeeDto feeDto);
        Task<DomainResponse> GetAll(int id);
        Task<DomainResponse> GetById(int id);
        DomainResponse GetAllByIdMember(int id);
        Task<DomainResponse> Delete(int id);
    }
}
