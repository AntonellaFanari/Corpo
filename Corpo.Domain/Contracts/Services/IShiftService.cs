using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IShiftService
    {
        DomainResponse GetAll(string from, string to, int classId);
        DomainResponse Add(List<Shift> shifts);
        DomainResponse Update(List<Shift> shifts);
        DomainResponse Delete(List<int> idShifts);
    }
}
