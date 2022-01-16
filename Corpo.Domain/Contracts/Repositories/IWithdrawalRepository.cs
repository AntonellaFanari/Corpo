using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IWithdrawalRepository
    {
        //WithdrawalName
        Task<List<WithdrawalName>> GetAllWithdrawalName();
        void DeleteWithdrawalName(int id);
        void AddWithdrawalName(WithdrawalName withdrawalName);
        Task<WithdrawalName> GetWithdrawalNameById(int id);
        void UpdateWithdrawalName(WithdrawalName withdrawalName);

        //Withdrawal
        Task<List<Withdrawal>> GetAllWithdrawal();
        void AddWithdrawal(Withdrawal withdrawal);
        Task<Withdrawal> GetWithdrawalById(int id);
        void DeleteWithdrawal(int id);
    }
}
