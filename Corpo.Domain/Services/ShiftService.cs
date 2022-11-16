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
    public class ShiftService : IShiftService
    {
        private IShiftRepository _shiftRespository;

        public ShiftService(IShiftRepository shiftRespository)
        {
            _shiftRespository = shiftRespository;
        }

        public DomainResponse Add(List<Shift> shifts)
        {
            try
            {
                foreach (var shift in shifts)
                {
                    _shiftRespository.Add(shift);
                };
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar los turnos");
            }
        }

        public async Task<DomainResponse> GetAll(DateTime from, DateTime to, int classId)
        {

            //DateTime fromDate = from.AddHours(DateTime.Now.Hour).AddMinutes(DateTime.Now.Minute).AddSeconds(DateTime.Now.Second);
            //DateTime toDate = to.AddHours(DateTime.Now.Hour).AddMinutes(DateTime.Now.Minute).AddSeconds(DateTime.Now.Second);
            var newFrom = from;
            var newTo = to;
            if (from == to)
            {
                DateTime currentDate = from;

                DayOfWeek referenceDayOfWeek = currentDate.DayOfWeek;


                int diffDaysFromMonday = DayOfWeek.Monday - referenceDayOfWeek;

                if (diffDaysFromMonday > 0) { diffDaysFromMonday -= 7; }

                var monday = currentDate.AddDays(diffDaysFromMonday);



                int diffDaysToSunday = (DayOfWeek.Sunday - referenceDayOfWeek);

                if (diffDaysToSunday < 0) { diffDaysToSunday += 7; }

                newTo = (currentDate.AddDays(diffDaysToSunday)).AddHours(23).AddMinutes(59).AddSeconds(59);
            }

            newFrom = DateTime.Now;
            var fromDay = from;
            var toDay = newTo.AddHours(23).AddMinutes(59).AddSeconds(59); ;
            var fromHour = new TimeSpan(newFrom.Hour, newFrom.Minute, newFrom.Second);
            var toHour = new TimeSpan(toDay.Hour, toDay.Minute, toDay.Second);

            var response = await _shiftRespository.GetAll(fromDay, fromHour, toDay, toHour, classId);

            return new DomainResponse
            {
                Success = true,
                Result = response
            };


        }
        public async Task<DomainResponse> GetByDay(DateTime day, int classId)
        {
            var newDay = DateTime.Now;
            var fromDay = day.AddHours(newDay.Hour).AddMinutes(newDay.Minute).AddSeconds(newDay.Second);
            var newTo = day.AddHours(23).AddMinutes(59).AddSeconds(59);
            var toDay = newTo;
            var fromHour = new TimeSpan(fromDay.Hour, fromDay.Minute, fromDay.Second);
            var toHour = new TimeSpan(newTo.Hour, newTo.Minute, newTo.Second);

            var response = await _shiftRespository.GetAll(day, fromHour, toDay, toHour, classId);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }


        async public Task<DomainResponse> Update(List<Shift> shifts)
        {
            try
            {
                foreach (var shift in shifts)
                {
                    var shiftQuery = await _shiftRespository.GetById(shift.Id);
                    shiftQuery.UserId = shift.UserId;
                    shiftQuery.Quota = shift.Quota;
                    await _shiftRespository.Update(shiftQuery);

                }
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "Algunos turnos no se modificaron.");
            }
        }
        public DomainResponse Delete(List<int> idShifts)
        {
            try
            {
                foreach (var idShift in idShifts)
                {
                    _shiftRespository.Delete(idShift);
                };
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo eliminar algunos de los turnos seleccionados.");
            }
        }

        async public Task<DomainResponse> GetById(int id)
        {
            var response = await _shiftRespository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> UpdateById(int id, StatusAttendance status)
        {
            var shift = await _shiftRespository.GetById(id);
            if (status == StatusAttendance.Reserved)
            {
                shift.Available--;
            }
            else
            {
                shift.Available++;
            };
            await _shiftRespository.Update(shift);
            return new DomainResponse
            {
                Success = true
            };

        }

    }
}
