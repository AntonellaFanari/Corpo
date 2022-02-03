using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IOutflowRepository
    {
        List<OutflowType> GetAllOutflowType();
        void DeleteOutflowType(int id);
        void AddOutflowType(OutflowType outflowType);
        void UpdateOutflowType(OutflowType outflowType);
        OutflowType GetOutflowTypeById(int id);
        void AddOutflow(Outflow outflow);
        List<Outflow> GetAllOutflow(DateTime from, DateTime? to);
        Outflow GetOutflowById(int id);
        void DeleteOutflow(int id);
    }
}
