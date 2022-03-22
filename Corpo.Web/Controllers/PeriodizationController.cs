using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
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
    public class PeriodizationController : CorpoBaseController
    {
        private IPeriodizationService _periodizationService;

        public PeriodizationController(IPeriodizationService periodizationService)
        {
            _periodizationService = periodizationService;
        }

        [HttpPost]
        public async Task<ActionResult> Add(Periodization periodization)
        {
            var response = await _periodizationService.Add(periodization);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Periodization periodization)
        {
            var response = await _periodizationService.Update(periodization);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<Periodization>> GetValidByMemberId(int? memberId)
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
            var response = await _periodizationService.GetValidByMemberId(userId);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Periodization>> GetById(int id)
        {
            var response = await _periodizationService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpGet("by-year")]
        public async Task<ActionResult<Periodization>> GetByYear(int year, int? memberId)
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
            var response = await _periodizationService.GetByYear(year, userId);
            return this.ToActionResult(response);
        }
    }
}
