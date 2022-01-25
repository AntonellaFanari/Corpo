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
        List<Fee> GetAll();
        Fee GetById(int id);
        List<Fee> GetAllByIdMember(int id);
        DateTime GetLastPayment(int id);
    }
}
