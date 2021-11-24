using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IPlanRepository
    {
        List<Plan> GetPlans();
        void Add(Plan newPlan);
        Plan GetById(int id);
        void Update(Plan planEdit);
        void Delete(int id);
    }
}
