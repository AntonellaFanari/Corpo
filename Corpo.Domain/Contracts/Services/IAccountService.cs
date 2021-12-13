using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IAccountService
    {
        DomainResponse Add(Account account);
        DomainResponse LogIn(Account account);
        DomainResponse UpdateEmail(Account account);
        DomainResponse UpdatePassword(AccountDto account);

    }
}
