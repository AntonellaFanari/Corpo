using Corpo.Domain.Models;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IBalanceRepository
    {
        void Add(BalanceToPay balance);
        List<BalanceToPayView> GetAll();
        List<BalanceToPay> GetAllByIdMember(int id);
        BalanceToPay GetById(int id);
        void Update(BalanceToPay balance);
        BalanceToPay GetPositiveBalanceByIdMember(int id);
        List<BalanceToPay> GetAllNegativeBalanceByIdMember(int id);
        Task<BalanceToPay> GetByIdTransaction(int id, TransactionType transactionType);
    }
}
