using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ISaleService
    {
        DomainResponse Add(LoggedUser user, SaleDto sale);
        DomainResponse GetAll(int id);
        DomainResponse GetDetailsSale(int idSale);
        Task<DomainResponse> Cancel(int userId, int id, CancelSale cancelSale);
        DomainResponse GetCancelSale(int idSale);
        DomainResponse GetSaleById(int idSale);
    }
}
