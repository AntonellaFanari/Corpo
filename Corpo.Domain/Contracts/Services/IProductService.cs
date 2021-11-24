using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IProductService
    {
        DomainResponse GetAll();
        Product GetById(int id);
        DomainResponse Add(Product product);
        DomainResponse Update(int id, Product product);
        DomainResponse Delete(int id);
    }
}
