using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ISaleRepository
    {
        List<SaleFeeIncomeDto> GetAll(DateTime from, DateTime? to);
        int Add(Sale sale);
        List<DetailsSale> GetDetailsSale(int idSale);
        void Cancel(int id, CancelSale cancelSale);
        CancelSale GetCancelSale(int idSale);
        Sale GetSaleById(int id);
    }
}
