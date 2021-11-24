using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface ISaleService
    {
        DomainResponse Add(Sale sale);
        DomainResponse GetAll();
        DomainResponse GetDetailsSale(int idSale);
        DomainResponse Cancel(int id, CancelSale cancelSale);
        DomainResponse GetCancelSale(int idSale);
    }
}
