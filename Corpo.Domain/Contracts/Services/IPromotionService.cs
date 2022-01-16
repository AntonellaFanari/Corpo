using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IPromotionService
    {
        DomainResponse GetAll();
        DomainResponse Delete(int id);
        DomainResponse Add(Promotion promotion);
        DomainResponse GetById(int id);
        DomainResponse Update(int id, Promotion promotion);
        
    }
}
