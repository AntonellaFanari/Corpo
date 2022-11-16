using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : CorpoBaseController
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
        public async Task<ActionResult> Add([FromBody] Attendance attendance)
        {
            var response = await _attendanceService.Add(attendance);
            return this.ToActionResult(response);
        }

        [HttpPut("cancelReservation")]
        async public Task<ActionResult> CancelReservation(int id, [FromBody] Credit credit)
        {
            var response = await _attendanceService.CancelReservation(id, credit);
            return Ok(response);
        }

        [HttpGet("getAllReservations")]
        async public Task<ActionResult<AttendanceReservationDto>> GetAllReservations(int? id)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            var response = await _attendanceService.GetAllReservations(userId);
            return Ok(response);
        }

        [HttpPut("update-attended")]
        public ActionResult UpdateAttended(int id, [FromBody] List<Attendance> attendancesRegister)
        {
            var response = _attendanceService.UpdateAttended(id, attendancesRegister);
            return Ok(response);
        }

        [HttpGet("get-by-id-member-by-month")]
        public ActionResult GetByIdMemberByMonth(int month)
        {
            if (month == 0)
            {
                month = DateTime.Now.Month;
            }
            var user = GetUser();
            var response = _attendanceService.GetByIdMemberByMonth(user.Id, month);
            return this.ToActionResult(response);
        }


        [HttpGet("all-by-month")]
        public async Task<ActionResult<List<Attendance>>> GetAllByMonth(int? id, int month)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            if (month == 0)
            {
                month = DateTime.Now.Month;
            }
            var response = await _attendanceService.GetAllByMonth(userId, month);
            return this.ToActionResult(response);
        }

        [HttpGet("all-reservations-detail")]
        async public Task<ActionResult<List<ReservationDto>>> GetAllReservationsDetail(int id)
        {
            var response = await _attendanceService.GetAllReservationsDetail(id);
            return Ok(response);
        }

        //[HttpGet("{memberId}/weekly-attendance")]
        //public Task<ActionResult> GetWeeklyAttendanceByMemberId(int memberId)
        //{
        //    var response = _attendanceService.GetWeeklyAttendanceByMemberId(memberId);
        //    return this.ToActionResult(response);
        //}

        [HttpGet("by-from-by-to-by-class")]
        public async Task<ActionResult> GetByFromByToByClass(DateTime from, DateTime to, int classId)
        {
            var id = GetUser().Id;
            var response = await _attendanceService.GetByFromByToByClass(id, from, to, classId);
            return this.ToActionResult(response);
        }


        [HttpGet("by-day")]
        public async Task<ActionResult> GetByDay(DateTime day, int classId)
        {
            var id = GetUser().Id;
            var response = await _attendanceService.GetByDay(id, day, classId);
            return this.ToActionResult(response);
        }

    }
}
