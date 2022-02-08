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
    public class PeriodizationController : ControllerBase
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Periodization>> GetValidByMemberId(int id)
        {
            var response = await _periodizationService.GetValidByMemberId(id);
            return this.ToActionResult(response);
        }
    }
}
