using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IPlanService
    {
        DomainResponse GetPlans();
        DomainResponse Add(Plan newPlan);
        Plan GetById(int id);
        DomainResponse Update(int id, Plan planEdit);
        DomainResponse Delete(int id);
    }
}
