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
    [Route("api/wod-member")]
    [ApiController]
    public class WodMemberController : CorpoBaseController
    {
        private IWodMemberService _wodMemberService;

        public WodMemberController(IWodMemberService wodMemberService)
        {
            _wodMemberService = wodMemberService;
        }

        [HttpGet("by-id")]
        public async Task<ActionResult> GetById(int id)
        {
            var response = await _wodMemberService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<ActionResult> Add(int id, int weekNumber, [FromBody] Periodization periodization)
        {
            var response = await _wodMemberService.Add(id, weekNumber, periodization);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] WodMember wodMember)
        {
            var response = await _wodMemberService.Update(wodMember);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = _wodMemberService.Delete(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<WodMember>>> GetAllWodMember(int id, DateTime from, DateTime to)
        {
            var response = await _wodMemberService.GetAllWodMember(id, from, to);
            return this.ToActionResult(response);
        }

        [HttpGet("by-week-valid")]
        public async Task<ActionResult<List<WodMember>>> GetAllByWeekValid(int id)
        {
            
            var response = await _wodMemberService.GetAllWodMemberWeek(id);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<WodMember>>> GetAllWodMemberWeek()
        {
            var user = GetUser();
            var response = await _wodMemberService.GetAllWodMemberWeek(user.Id);
            return this.ToActionResult(response);
        }


        [HttpPut("rate")]
        public async Task<ActionResult> UpdateRate(int id, int rate)
        {
            var response = await _wodMemberService.UpdateRate(id, rate);
            return this.ToActionResult(response);
        }

        [HttpGet("attended/{periodizationId}")]
        public async Task<ActionResult> GetAttended(int periodizationId, int? memberId)
        {
           
            int userId = 0;
            if (memberId == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = memberId.Value;
            }
            var response = await _wodMemberService.GetAttended(periodizationId, userId);
            return this.ToActionResult(response);
        }

        [HttpGet("by-week-number")]
        public async Task<ActionResult> GetByWeekNumber(int weekNumber, int? memberId)
        {
            int userId = 0;
            if (memberId == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = memberId.Value;
            }
            var response = await _wodMemberService.GetByWeekNumber(weekNumber, userId);
            return this.ToActionResult(response);
        }

        [HttpGet("by-Week")]
        public async Task<ActionResult<WodMember>> GetByPeriodizationIdWeekNumber(int id, int weekNumber)
        {
            var response = await _wodMemberService.GetByPeriodizationIdWeekNumber(id, weekNumber);
            return this.ToActionResult(response);
        }

        [HttpDelete("delete-wods")]
        public async Task<ActionResult> DeleteWods(int periodizationId, int weekNumber)
        {
            var response = await _wodMemberService.DeleteWods(periodizationId, weekNumber);
            return this.ToActionResult(response);
        }

        [HttpGet("attendance-by-year")]
        public async Task<ActionResult> GetAttendanceByYear(int? year, int? memberId)
        {
            int userId = 0;
            if (memberId == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = memberId.Value;
            };
            if (year == null)
            {
                year = DateTime.Now.Year;
            }
            var response = await _wodMemberService.GetAttendanceByYear(year.Value, userId);
            return this.ToActionResult(response);
        }

        [HttpPut("rest")]
        public async Task<ActionResult> UpdateRest(int id, int rest)
        {
            var response = await _wodMemberService.UpdateRest(id, rest);
            return this.ToActionResult(response);
        }

    }
}
