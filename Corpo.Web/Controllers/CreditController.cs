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
    public class CreditController : ControllerBase
    {
        private ICreditService _creditService;

        public CreditController(ICreditService creditService)
        {
            _creditService = creditService;
        }

        [HttpGet("getById")]
        async public Task<ActionResult<Credit>> GetById(int id)
        {
            var response = await _creditService.GetById(id);
            return Ok(response);
        }

        [HttpPut("update")]
        public ActionResult Update([FromBody] Credit credit)
        {
            var response = _creditService.Update(credit);
            return this.ToActionResult(response);
        }

        [HttpPut("update-recharge")]
        public ActionResult UpdateRecharge([FromBody] Credit credit)
        {
            var response = _creditService.UpdateRecharge(credit);
            return this.ToActionResult(response);
        }
    }
}
