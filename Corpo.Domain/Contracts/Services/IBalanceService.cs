﻿using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IBalanceService
    {
        DomainResponse Add(BalanceToPay balance);
        DomainResponse GetAll();
        DomainResponse GetAllByIdMember(int id);
        DomainResponse GetById(int id);
        DomainResponse Update(int id, BalanceToPay balance);
        DomainResponse GetPositiveBalanceByIdMember(int id);
        Task<DomainResponse> CancelBalance(int userId, int memberId, decimal pay);
        Task<DomainResponse> GetByIdTransaction(int id, TransactionType transactionType);
        Task BalanceAnalyse(int userId, BalanceToPay balance);
    }
}
