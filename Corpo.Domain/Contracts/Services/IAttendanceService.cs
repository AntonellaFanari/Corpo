using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IAttendanceService
    {
        Task<DomainResponse> Add(Attendance attendance);
        Task<DomainResponse> GetAllByIdShift(int id);
        Task<DomainResponse> CancelReservation(int id, Credit credit);
        Task<DomainResponse> GetAllReservations(int id);
        Task<DomainResponse> UpdateAttended(int id, List<Attendance> attendancesRegister);
        DomainResponse AttendanceByIdMemberByMonth(int id, int month);
        Task<DomainResponse> AllReservationsDetail(int id);


    }
}
