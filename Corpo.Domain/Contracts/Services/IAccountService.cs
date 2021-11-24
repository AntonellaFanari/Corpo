using Corpo.Domain.Models;
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

    }
}
