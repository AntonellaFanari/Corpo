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
    public class CashController : ControllerBase
    {
        private ICashService _cashService;

        public CashController(ICashService cashService)
        {
            _cashService = cashService;
        }

        [HttpGet]
        public async Task<ActionResult> GetLastCash()
        {

            var response = await _cashService.GetLastCash();
            return this.ToActionResult(response);
        }

        [HttpGet("monthly-cash")]
        public async Task<ActionResult> GetMonthlyCash()
        {

            var response = await _cashService.GetMonthlyCash();
            return this.ToActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCash(int id, Cash cash)
        {
            var response = await _cashService.UpdateCash(id, cash);
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<ActionResult> Add()
        {
            var response = await _cashService.Add();
            return this.ToActionResult(response);
        }
    }
}
