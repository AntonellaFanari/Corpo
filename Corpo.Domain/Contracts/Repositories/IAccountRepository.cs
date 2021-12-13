using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IAccountRepository
    {
        int Add(Account account);
        Account GetByEmail(string email);
        void Delete(int id);
        Account GetById(int id);
        void UpdateEmail(Account account);
        void UpdatePassword(Account account);
    }
}
