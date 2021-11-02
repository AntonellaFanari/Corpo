﻿using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class AccountRepository: IAccountRepository
    {
        private CorpoContext _context;

        public AccountRepository(CorpoContext context)
        {
            _context = context;
        }

        public int Add(Account account)
        {
            try
            {
                _context.Account.Add(account);
                _context.SaveChanges();
                return account.Id;
            }
            catch (DbUpdateException ex)
            {
                SqlException innerException = ex.InnerException as SqlException;
                if (innerException != null && innerException.ErrorCode == -2146232060)
                {
                    throw new UniqueException();
                }
                throw;
            }
        }

        public Account GetByEmail(string email)
        {
            var account = _context.Account.FirstOrDefault(x=>x.Email == email);
            return account;

        }
    }
}
