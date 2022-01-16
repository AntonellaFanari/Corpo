using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IPromotionRepository
    {
        List<Promotion> GetAll();
        void Delete(int id);
        void Add(Promotion promotion);
        Promotion GetById(int id);
        void Update(Promotion promotion);
    }
}
