using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IOutflowService
    {
        DomainResponse GetAllOutflowType();
        DomainResponse DeleteOutflowType(int id);
        DomainResponse AddOutflowType(OutflowType outflowType);
        DomainResponse UpdateOutflowType(OutflowType outflowType);
        OutflowType GetOutflowTypeById(int id);
        DomainResponse AddOutflow(Outflow outflow);
        DomainResponse GetAllOutflow();
        Outflow GetOutflowById(int id);
        DomainResponse DeleteOutflow(int id);
    }
}
