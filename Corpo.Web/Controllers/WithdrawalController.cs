using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WithdrawalController : ControllerBase
    {
        private IWithdrawalService _withdrawalService;

        public WithdrawalController(IWithdrawalService withdrawalService)
        {
            _withdrawalService = withdrawalService;
        }

        //withdrawalName

        [HttpGet("getAllWithdrawalName")]
        async public Task<ActionResult> GetAllWithdrawalName()
        {
            var response = await _withdrawalService.GetAllWithdrawalName();
            var listWithdrawalName = ((IEnumerable)response.Result).Cast<WithdrawalName>().ToList();
            return Ok(listWithdrawalName);
        }

        [HttpGet("getWithdrawalNameById")]
        async public Task<ActionResult<WithdrawalName>> GetWithdrawalNameById(int id)
        {
            var response = await _withdrawalService.GetWithdrawalNameById(id);
            return Ok(response);
        }

        [HttpDelete("deleteWithdrawalName")]
        public ActionResult DeleteWithdrawalName(int id)
        {
            var response = _withdrawalService.DeleteWithdrawalName(id);
            return this.ToActionResult(response);
        }

        [HttpPost("addWithdrawalName")]
        public ActionResult AddWithdrawalName(WithdrawalName withdrawalName)
        {
            var response = _withdrawalService.AddWithdrawalName(withdrawalName);
            return this.ToActionResult(response);
        }

        [HttpPut("updateWithdrawalName")]
        public async Task<ActionResult> UpdateWithdrawalName(int id, WithdrawalName withdrawalName)
        {
            var response = await _withdrawalService.UpdateWithdrawalName(id, withdrawalName);
            return this.ToActionResult(response);
        }

        //withdrawal

        [HttpGet("getAllWithdrawal")]
        async public Task<ActionResult> GetAllWithdrawal()
        {
            var response = await _withdrawalService.GetAllWithdrawal();
            var listWithdrawal = ((IEnumerable)response.Result).Cast<Withdrawal>().ToList();
            return Ok(listWithdrawal);
        }

        [HttpPost("addWithdrawal")]
        public ActionResult AddWithdrawal(Withdrawal withdrawal)
        {
            var response = _withdrawalService.AddWithdrawal(withdrawal);
            return this.ToActionResult(response);
        }

        [HttpGet("getWithdrawalById")]
        async public Task<ActionResult<Withdrawal>> GetWithdrawalById(int id)
        {
            var response = await _withdrawalService.GetWithdrawalById(id);
            return Ok(response);
        }

        [HttpDelete("deleteWithdrawal")]
        public ActionResult DeleteWithdrawal(int id)
        {
            var response = _withdrawalService.DeleteWithdrawal(id);
            return this.ToActionResult(response);
        }

    }
}
