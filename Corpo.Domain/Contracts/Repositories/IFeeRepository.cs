using Corpo.Domain.Models;
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
        List<Fee> GetAll(DateTime from, DateTime? to);
        Fee GetById(int id);
        List<Fee> GetAllByIdMember(int id);
        Fee GetLastPayment(int id);
        Task<int> Delete(int id);
    }
}
