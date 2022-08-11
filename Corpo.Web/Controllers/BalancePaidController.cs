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
    [Route("api/balance-paid")]
    [ApiController]
    public class BalancePaidController : CorpoBaseController
    {
        private IBalancePaidService _balancePaidService;

        public BalancePaidController(IBalancePaidService balancePaidService)
        {
            _balancePaidService = balancePaidService;
        }

        [HttpGet]
        public async Task<ActionResult<BalancePaid>> GetAll(int id)
        {
            var response = await _balancePaidService.GetAll(id);
            return this.ToActionResult(response);
        }

        [HttpGet("by-id")]
        public async Task<ActionResult<BalancePaid>> GetById(int id)
        {
            var response = await _balancePaidService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPost("cancel")]
        public async Task<ActionResult> Cancel(CancelBalancePaid cancelBalancePaid)
        {
            var user = GetUser();
            var response = await _balancePaidService.Cancel(user.Id, cancelBalancePaid);
            return this.ToActionResult(response);
        }


        [HttpGet("cancel-by-id")]
        public async Task<ActionResult<CancelBalancePaid>> GetCancelById(int id)
        {
            var response = await _balancePaidService.GetCancelById(id);
            return this.ToActionResult(response);
        }


    }
}
