using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IFeeService
    {
        DomainResponse Add(FeeDto feeDto);
        DomainResponse GetAll();
        Fee GetById(int id);
        DomainResponse GetAllByIdMember(int id);
    }
}
