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

        public AttendanceService(IAttendanceRepository attendanceRepository, ICreditService creditService, IShiftService shiftService)
        {
            _attendanceRepository = attendanceRepository;
            _creditService = creditService;
            _shiftService = shiftService;
        }

        public DomainResponse Add(Attendance attendance)
        {
            try
            {
                attendance.DateReservation = DateTime.Now;
                attendance.DateCancellation = null;
                _attendanceRepository.Add(attendance);
                _shiftService.UpdateById(attendance.ShiftId, attendance.Status);
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
                _shiftService.UpdateById(attendance.ShiftId, attendance.Status);
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
                    _creditService.Update(credit);
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
    }
}
