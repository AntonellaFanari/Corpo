using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IAttendanceRepository
    {
        Task Add(Attendance attendance);
        Task<List<MemberAttendanceDto>> GetAllByIdShift(int id);
        void CancelReservation(Attendance attendance);
        Task<Attendance> GetById(int id);
        Task<List<AttendanceReservationDto>> GetAllReservations(int id, DateTime from, DateTime to);
        void Update(Attendance attendance);
        List<DateTime> GetByIdMemberByMonth(int id, int month);
        Task<List<ReservationDto>> GetAllReservationsDetail(int id);
        Task<List<Attendance>> GetAllByMonth(int id, int month);
        Task<List<AttendanceReservationDto>> GetByFromByToByClass(int id, DateTime from, DateTime to, int classId);
    }
}
