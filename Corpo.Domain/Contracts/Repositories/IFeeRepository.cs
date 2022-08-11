using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IFeeRepository
    {
        int Add(Fee fee);
        Task<List<SaleFeeIncomeDto>> GetAll(DateTime from, DateTime? to);
        Task<Fee> GetById(int id);
        List<Fee> GetAllByIdMember(int id);
        Task<Fee> GetLastPayment(int id);
        Task<int> Delete(int id);
    }
}
