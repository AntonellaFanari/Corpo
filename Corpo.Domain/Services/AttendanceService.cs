using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class AttendanceService : IAttendanceService
    {
        private IAttendanceRepository _attendanceRepository;
        private ICreditService _creditService;
        private IShiftService _shiftService;
        private readonly IShiftRepository _shiftRepository;
        private IMemberRepository _memberRepository;

        public AttendanceService(IAttendanceRepository attendanceRepository, ICreditService creditService, IShiftService shiftService,
            IShiftRepository shiftRepository, IMemberRepository memberRepository)
        {
            _attendanceRepository = attendanceRepository;
            _creditService = creditService;
            _shiftService = shiftService;
            _shiftRepository = shiftRepository;
            _memberRepository = memberRepository;
        }

        public async Task<DomainResponse> Add(Attendance attendance)
        {
            try
            {
                var creditId = _memberRepository.GetById(attendance.MemberId).CreditId;
                var credit = (Credit)_creditService.GetById(creditId).Result.Result;
                var shift = await _shiftRepository.GetById(attendance.ShiftId);
                if (credit.Expiration < DateTime.Now)
                {
                    attendance.UsingNegative = true;
                };
                attendance.DateReservation = DateTime.Now;
                attendance.DateCancellation = null;
                attendance.DateShift = shift.Day.Date.Add(shift.Hour);
                _attendanceRepository.Add(attendance);
                _creditService.Update(credit);
                await _shiftService.UpdateById(attendance.ShiftId, attendance.Status);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo reservar turno.");
            }

        }

        public DomainResponse AttendanceByIdMemberByMonth(int id, int month)
        {
            var response = _attendanceRepository.AttendanceByIdMemberByMonth(id, month);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> CancelReservation(int id, Credit credit)
        {
            var timeCancellation = 40;
            var attendance = await _attendanceRepository.GetById(id);
            attendance.DateCancellation = DateTime.Now;
            attendance.Status = StatusAttendance.Cancelled;
            var shift = _shiftService.GetById(attendance.ShiftId);
            var s = shift.Result.Result as Shift;
            var differenceTime = (s.Day - DateTime.Now).TotalMinutes;
            try
            {
                _attendanceRepository.CancelReservation(attendance);
                await _shiftService.UpdateById(attendance.ShiftId, attendance.Status);
                if (differenceTime > timeCancellation)
                {
                    if (credit.Expiration < attendance.DateReservation)
                    {
                        credit.Negative--;
                    }
                    else
                    {
                        credit.CreditConsumption--;
                    };
                    _creditService.UpdateRecharge(credit);
                };

                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo cancelar la reserva.");
            }


        }

        async public Task<DomainResponse> GetAllByIdShift(int id)
        {
            var response = await _attendanceRepository.GetAllByIdShift(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> GetAllReservations(int id)
        {
            var response = await _attendanceRepository.GetAllReservations(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> UpdateAttended(int id, List<Attendance> attendancesRegister)
        {
            var shift = await _shiftRepository.GetById(id);
            shift.Attended = true;
            foreach (var attendance in attendancesRegister)
            {
                var attendanceQuery = await _attendanceRepository.GetById(attendance.Id);
                attendanceQuery.Status = attendance.Status;
                try
                {
                    _attendanceRepository.Update(attendanceQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    return new DomainResponse(false, ex.Message, "no se pudo registrar las asistencia");
                }
            };
            await _shiftRepository.Update(shift);
            return new DomainResponse
            {
                Success = true
            };

        }

        public async Task<DomainResponse> AllReservationsDetail(int id)
        {
            var response = await _attendanceRepository.AllReservationsDetail(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
