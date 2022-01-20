using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet("getAllByIdShift")]
        async public Task<ActionResult<MemberAttendanceDto>> GetAllByIdShift(int id)
        {
            var response = await _attendanceService.GetAllByIdShift(id);
            return Ok(response);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody] Attendance attendance)
        {
            var response = _attendanceService.Add(attendance);
            return this.ToActionResult(response);
        }

        [HttpPut("cancelReservation")]
        async public Task<ActionResult> CancelReservation(int id, [FromBody] Credit credit)
        {
            var response = await _attendanceService.CancelReservation(id, credit);
            return Ok(response);
        }

        [HttpGet("getAllReservations")]
        async public Task<ActionResult<AttendanceReservationDto>> GetAllReservations(int id)
        {
            var response = await _attendanceService.GetAllReservations(id);
            return Ok(response);
        }

    }
}
