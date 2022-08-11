using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private CorpoContext _context;

        public AttendanceRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(Attendance attendance)
        {
            _context.Attendance.Add(attendance);
            await _context.SaveChangesAsync();
        }

        public void CancelReservation(Attendance attendance)
        {
            _context.Attendance.Update(attendance);
            _context.SaveChanges();
        }

        public Task<List<MemberAttendanceDto>> GetAllByIdShift(int id)
        {
            return _context.Attendance.Where(x => x.ShiftId == id).Include(x => x.Member).Include(x => x.Member.Credit).Select(x => new MemberAttendanceDto
            {
                Id = x.Id,
                MemberId = x.MemberId,
                Name = x.Member.LastName + " " + x.Member.Name,
                Expiration = x.Member.Credit.Expiration,
                RemainingCredit = DateTime.Now > x.Member.Credit.Expiration ? 0 : x.Member.Credit.InitialCredit - x.Member.Credit.CreditConsumption,
                CreditId = x.Member.CreditId,
                Status = x.Status
            }).ToListAsync();
        }

        async public Task<List<AttendanceReservationDto>> GetAllReservations(int id, DateTime fromm, DateTime to)
        {
            return await (from p in _context.Attendance
                          where p.MemberId == id && p.DateShift >= fromm && p.DateShift <= to
                          join c in _context.Shift
                          on p.ShiftId equals c.Id
                          join e in _context.Class
                          on c.ClassId equals e.Id
                          select (new AttendanceReservationDto
                          {
                              Id = p.Id,
                              ShiftId = p.ShiftId,
                              Shift = c,
                              Status = p.Status,
                              Class = e
                          })).ToListAsync();
        }

        private Shift GetShift(int id)
        {
            return _context.Shift.Include(x => x.Class).FirstOrDefault(x => x.Id == id);
        }

        public Task<Attendance> GetById(int id)
        {
            return _context.Attendance.FirstOrDefaultAsync(x => x.Id == id);
        }

        public void Update(Attendance attendance)
        {
            _context.Attendance.Update(attendance);
            _context.SaveChanges();
        }

        public List<DateTime> GetByIdMemberByMonth(int id, int month)
        {
            var date = DateTime.Now;
            return _context.Attendance.Where(x => x.MemberId == id && x.DateShift.Month == month && x.Status == StatusAttendance.Attended)
                .Select(x => x.DateShift).ToList();
        }

        public async Task<List<ReservationDto>> GetAllReservationsDetail(int id)
        {
            var list = await _context.Fee.OrderByDescending(x => x.Date).Where(x => x.MemberId == id).Include(x => x.Member)
            .Include(x => x.Member.Credit).Include(x => x.Member.Plan)
            .Include(x => x.Member.Attendance).Select(x => new ReservationDto
            {
                NamePlan = x.PlanName,
                EntryDate = x.Member.EntryDate,
                FeeDate = x.Date,
                Expiration = x.To,
                Reservations = (List<AttendanceReservationDto>)x.Member.Attendance
                    .Where(y => y.DateShift >= x.Date && y.DateShift <= x.To)
                    .OrderByDescending(x => x.DateShift)
                    .Select(y => new AttendanceReservationDto
                    {
                        Id = y.Id,
                        ShiftId = y.ShiftId,
                        DateShift = y.DateShift,
                        Status = y.Status,
                        DateReservation = y.DateReservation,
                        DateCancellation = y.DateCancellation,
                        UsingNegative = y.UsingNegative,
                        ReturnCredit = y.ReturnCredit,
                        Shift = _context.Shift.Include(c => c.Class).FirstOrDefault(c => c.Id == y.ShiftId)
                    })
            }).ToListAsync();
            return list;

        }

        public Task<List<Attendance>> GetAllByMonth(int id, int month)
        {
            return _context.Attendance.Where(x => x.MemberId == id && x.DateShift.Month == month).ToListAsync();
        }

        public async Task<List<AttendanceReservationDto>> GetByFromByToByClass(int id, DateTime fromm, DateTime to, int classId)
        {

            var list = new List<AttendanceReservationDto>();
            if (classId != 0)
            {
                list = await (from p in _context.Attendance
                              where p.MemberId == id && p.DateShift >= fromm && p.DateShift <= to
                              join c in _context.Shift
                              on p.ShiftId equals c.Id
                              join e in _context.Class
                              on c.ClassId equals e.Id
                              where c.ClassId == classId
                              select (new AttendanceReservationDto
                              {
                                  Id = p.Id,
                                  ShiftId = p.ShiftId,
                                  Shift = c,
                                  Status = p.Status,
                                  Class = e
                              })).ToListAsync();
            }
            else
            {
                list = await (from p in _context.Attendance
                              where p.MemberId == id && p.DateShift >= fromm && p.DateShift <= to
                              join c in _context.Shift
                              on p.ShiftId equals c.Id
                              join e in _context.Class
                              on c.ClassId equals e.Id
                              select (new AttendanceReservationDto
                              {
                                  Id = p.Id,
                                  ShiftId = p.ShiftId,
                                  Shift = c,
                                  Status = p.Status,
                                  Class = e
                              })).ToListAsync();
            }
            return list.ToList();

        }
    }
}
