using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
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
    public class ReportController : ControllerBase
    {
        private IReportService _reportService;
        private ICashService _cashService;

        public ReportController(IReportService reportService, ICashService cashService)
        {
            _reportService = reportService;
            _cashService = cashService;
        }

        [HttpGet("members-statistics")]
        public async Task<ActionResult<MembersStatisticsDto>> MemberStatisticsAsync()
        {
            var response = await _reportService.MemberStatisticsAsync();
            return this.ToActionResult(response);
        }

        [HttpGet("members-statistics-detail")]
        public async Task<ActionResult<List<MemberViewModel>>> MembersStatisticsDetailAsync(string reportType)
        {
            var response = await _reportService.MembersStatisticsDetailAsync(reportType);
            return this.ToActionResult(response);
        }


        [HttpGet("current-month")]
        public async Task<ActionResult> GetCashCurrentMonth()
        {

            var response = await _cashService.GetCashCurrentMonth();
            return this.ToActionResult(response);
        }

        [HttpGet("cash")]
        public async Task<ActionResult> GetCash(DateTime from, DateTime to)
        {

            var response = await _cashService.GetCash(from, to);
            return this.ToActionResult(response);
        }

        [HttpGet("cash-detailed")]
        public async Task<ActionResult> GetCashDetailed(DateTime opening, DateTime closing)
        {

            var response = await _cashService.GetDetailed(opening, closing);
            return this.ToActionResult(response);
        }


        [HttpGet("cash-by-date")]
        public async Task<ActionResult<Cash>> GetCashByDate(DateTime date)
        {
            var response = await _cashService.GetByDate(date);
            return this.ToActionResult(response);
        }

        [HttpGet("record-cash-by-month")]
        public async Task<ActionResult<Cash>> GetRecordCashByMonth(int month)
        {
            var response = await _cashService.GetRecordCashByMonth(month);
            return this.ToActionResult(response);
        }

        [HttpGet("all-monthly-cash")]
        public async Task<ActionResult<Cash>> GetAllMonthlyCash()
        {
            var response = await _cashService.GetAllMonthlyCash();
            return this.ToActionResult(response);
        }

        [HttpGet("members-actives-by-plan")]
        public async Task<ActionResult<List<MembersActivesPlanDto>>> GetMembersActivesByPlan(string planName)
        {
            var response = await _reportService.GetMembersActivesByPlan(planName);
            return this.ToActionResult(response);
        }
    }
}
