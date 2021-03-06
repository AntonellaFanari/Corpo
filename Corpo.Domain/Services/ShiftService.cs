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

        public DomainResponse GetAll(string from, string to, int classId)
        {
            var fromDate = Convert.ToDateTime(from);
            var toDate = Convert.ToDateTime(to);
            var response = _shiftRespository.GetAll(fromDate, toDate, classId);
            if (response.Count > 0)
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = response
                };
            }
            else
            {
                return new DomainResponse(false, "no hay registros", "no hay turnos para estas fechas");
            }

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
            if (status == StatusAttendance.Reserved )
            {
                shift.Available --;
            }
            else
            {
                shift.Available ++;
            };
            await _shiftRespository.Update(shift);
            return new DomainResponse
            {
                Success = true
            };

        }
    }
}
