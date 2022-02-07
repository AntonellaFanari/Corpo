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

        [HttpGet("last")]
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


        [HttpGet("current-month")]
        public async Task<ActionResult> GetCashCurrentMonth()
        {

            var response = await _cashService.GetCashCurrentMonth();
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult> GetCash(DateTime from, DateTime to)
        {

            var response = await _cashService.GetCash(from, to);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {

            var response = await _cashService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpGet("detailed")]
        public async Task<ActionResult> GetDetailed(DateTime opening, DateTime closing)
        {

            var response = await _cashService.GetDetailed(opening, closing);
            return this.ToActionResult(response);
        }
    }
}
