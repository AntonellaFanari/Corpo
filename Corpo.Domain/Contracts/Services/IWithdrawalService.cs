using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IWithdrawalService
    {
        //withdrawalName
        Task<DomainResponse> GetAllWithdrawalName();
        DomainResponse DeleteWithdrawalName(int id);
        DomainResponse AddWithdrawalName(WithdrawalName withdrawalName);
        Task<DomainResponse> GetWithdrawalNameById(int id);
        Task<DomainResponse> UpdateWithdrawalName(int id, WithdrawalName withdrawalName);

        //withdrawal
        Task<DomainResponse> GetAllWithdrawal(int id);
        Task<DomainResponse> AddWithdrawal(int id, Withdrawal withdrawal);
        Task<DomainResponse> GetWithdrawalById(int id);
        Task<DomainResponse> DeleteWithdrawal(int id);
    }
}
