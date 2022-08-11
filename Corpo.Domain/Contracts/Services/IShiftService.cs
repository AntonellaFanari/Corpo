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
        Task<DomainResponse> GetAll(DateTime from, DateTime to, int classId);
        DomainResponse Add(List<Shift> shifts);
        Task<DomainResponse> Update(List<Shift> shifts);
        DomainResponse Delete(List<int> idShifts);
        Task<DomainResponse> GetById(int id);
        Task<DomainResponse> UpdateById(int id, StatusAttendance status);
    }
}
