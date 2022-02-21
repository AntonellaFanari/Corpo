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
        DomainResponse Add(LoggedUser user, FeeDto feeDto);
        DomainResponse GetAll(int id);
        Fee GetById(int id);
        DomainResponse GetAllByIdMember(int id);
        Task<DomainResponse> Delete(int id);
    }
}
