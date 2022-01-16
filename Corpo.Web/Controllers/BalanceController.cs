using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
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
    public class BalanceController : ControllerBase
    {
        private IBalanceService _balanceService;

        public BalanceController(IBalanceService balanceService)
        {
            _balanceService = balanceService;
        }

        //[HttpPost("add")]
        //public ActionResult Add([FromBody] BalanceToPay balance)
        //{
        //    var response = _balanceService.Add(balance);
        //    return this.ToActionResult(response);
        //}

        [HttpGet("getAll")]
        public ActionResult GetAll()
        {
            var response = _balanceService.GetAll();
            var listBalances = ((IEnumerable)response.Result).Cast<BalanceToPayView>().ToList();
            return Ok(listBalances);
        }

        [HttpGet("getAllByIdMember")]
        public ActionResult GetAllByIdMember(int id)
        {
            var response = _balanceService.GetAllByIdMember(id);
            var listBalances = ((IEnumerable)response.Result).Cast<BalanceToPay>().ToList();
            return Ok(listBalances);
        }

        [HttpGet("getById")]
        public ActionResult GetById(int id)
        {
            var response = _balanceService.GetById(id);
            return Ok(response);
        }

        [HttpPut("update")]
        public ActionResult Update(int id, BalanceToPay balance)
        {
            var response = _balanceService.Update(id, balance);
            return this.ToActionResult(response);
        }

        [HttpGet("getPositiveBalanceByIdMember")]
        public ActionResult GetPositiveBalanceByIdMember(int id)
        {
            var response = _balanceService.GetPositiveBalanceByIdMember(id);
            return Ok(response);
        }

        [HttpPut("cancelBalance")]
        public ActionResult CancelBalance(PayCancelBalanceDto payCancelBalance)
        {
            var response = _balanceService.CancelBalance(payCancelBalance);
            return this.ToActionResult(response);
        }


    }
}
