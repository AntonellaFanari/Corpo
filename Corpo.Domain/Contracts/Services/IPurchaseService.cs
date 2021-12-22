using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IPurchaseService
    {
        DomainResponse GetAll();
        DomainResponse Delete(int id);
        DomainResponse GetDetailPurchase(int id);
        DomainResponse Add(Purchase purchase);
    }
}
