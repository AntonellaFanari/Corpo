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
        private ISettingsRepository _settingsRepository;
        private IWodMemberRepository _wodMemberRepository;
        private IPeriodizationRepository _periodizationRepository;

        public AttendanceService(IAttendanceRepository attendanceRepository, ICreditService creditService, IShiftService shiftService,
            IShiftRepository shiftRepository, IMemberRepository memberRepository, ISettingsRepository settingsRepository,
            IWodMemberRepository wodMemberRepository, IPeriodizationRepository periodizationRepository)
        {
            _attendanceRepository = attendanceRepository;
            _creditService = creditService;
            _shiftService = shiftService;
            _shiftRepository = shiftRepository;
            _memberRepository = memberRepository;
            _settingsRepository = settingsRepository;
            _wodMemberRepository = wodMemberRepository;
            _periodizationRepository = periodizationRepository;
        }

        public async Task<DomainResponse> Add(Attendance attendance)
        {
            try
            {
                var creditId = _memberRepository.GetById(attendance.MemberId).Result.CreditId;
                var credit = (Credit)_creditService.GetById(creditId).Result.Result;
                var shift = await _shiftRepository.GetById(attendance.ShiftId);
                if (credit.Expiration < DateTime.Now || credit.InitialCredit == credit.CreditConsumption)
                {
                    attendance.UsingNegative = true;
                };
                attendance.DateReservation = DateTime.Now;
                attendance.DateCancellation = null;
                attendance.DateShift = shift.Day.Date.Add(shift.Hour);
                await _attendanceRepository.Add(attendance);
                await _creditService.Update(credit);
                await _shiftService.UpdateById(attendance.ShiftId, attendance.Status);
                var weekPlanned = await _periodizationRepository.GetPeriodizationWeekPlannedByShiftDate(attendance.DateShift);
                if (weekPlanned != null)
                {
                    await _wodMemberRepository.SetShiftDate(attendance.DateShift);
                }
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

        public DomainResponse GetByIdMemberByMonth(int id, int month)
        {
            var response = _attendanceRepository.GetByIdMemberByMonth(id, month);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> CancelReservation(int id, Credit credit)
        {
            var timeCancellation = await _settingsRepository.GetByName("timeLimitCancell");
            var attendance = await _attendanceRepository.GetById(id);
            attendance.DateCancellation = DateTime.Now;
            attendance.Status = StatusAttendance.Cancelled;
            var shift = _shiftService.GetById(attendance.ShiftId);
            var s = shift.Result.Result as Shift;
            var differenceTime = (s.Day - DateTime.Now).TotalMinutes;
            try
            {
                await _shiftService.UpdateById(attendance.ShiftId, attendance.Status);
                if (differenceTime > int.Parse(timeCancellation.Value))
                {
                    attendance.ReturnCredit = true;
                    _attendanceRepository.CancelReservation(attendance);
                    if (credit.Expiration < attendance.DateReservation)
                    {
                        credit.Negative--;
                    }
                    else
                    {
                        credit.CreditConsumption--;
                    };
                    await _creditService.UpdateRecharge(credit);
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
            var newFrom = DateTime.Now;
            var newTo = DateTime.Now;

            DateTime currentDate = newFrom;

            DayOfWeek referenceDayOfWeek = currentDate.DayOfWeek;


            int diffDaysFromMonday = DayOfWeek.Monday - referenceDayOfWeek;

            if (diffDaysFromMonday > 0) { diffDaysFromMonday -= 7; }

            newFrom = currentDate.AddDays(diffDaysFromMonday);



            int diffDaysToSunday = (DayOfWeek.Sunday - referenceDayOfWeek);

            if (diffDaysToSunday < 0) { diffDaysToSunday += 7; }

            newTo = (currentDate.AddDays(diffDaysToSunday)).AddHours(23).AddMinutes(59).AddSeconds(59);
            var response = await _attendanceRepository.GetAllReservations(id, newFrom, newTo);
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

        public async Task<DomainResponse> GetAllReservationsDetail(int id)
        {
            var response = await _attendanceRepository.GetAllReservationsDetail(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetAllByMonth(int id, int month)
        {
            var response = await _attendanceRepository.GetAllByMonth(id, month);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetByFromByToByClass(int id, DateTime from, DateTime to, int classId)
        {
            var newFrom = from;
            var newTo = to;
            if (from == to)
            {
                DateTime currentDate = from;

                DayOfWeek referenceDayOfWeek = currentDate.DayOfWeek;


                int diffDaysFromMonday = DayOfWeek.Monday - referenceDayOfWeek;

                if (diffDaysFromMonday > 0) { diffDaysFromMonday -= 7; }

                newFrom = currentDate.AddDays(diffDaysFromMonday);



                int diffDaysToSunday = (DayOfWeek.Sunday - referenceDayOfWeek);

                if (diffDaysToSunday < 0) { diffDaysToSunday += 7; }

                newTo = (currentDate.AddDays(diffDaysToSunday)).AddHours(23).AddMinutes(59).AddSeconds(59);
            }
            var response = await _attendanceRepository.GetByFromByToByClass(id, newFrom, newTo, classId);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        //public async Task<DomainResponse> GetWeeklyAttendanceByMemberId(int memberId)
        //{
        //    DateTime from = DateTime.Today.AddDays(-1 * ((int)(DateTime.Today.DayOfWeek) - 1));
        //    DateTime to = DateTime.Today.AddDays(-1 * ((int)(DateTime.Today.DayOfWeek) - 7));
        //    //var response = await _attendanceRepository.GetWeeklyAttendanceByMemberId(memberId, from, to);
        //    return new DomainResponse
        //    {
        //        //Success = true,
        //        //Result = response
        //    };
        //}
    }
}
