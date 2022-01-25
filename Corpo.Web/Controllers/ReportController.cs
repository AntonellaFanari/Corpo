using Corpo.Domain.Contracts.Services;
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

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
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
    }
}
