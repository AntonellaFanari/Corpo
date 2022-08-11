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
    public class FeeController : CorpoBaseController
    {
        private IFeeService _feeService;

        public FeeController(IFeeService feeService)
        {
            _feeService = feeService;
        }
        [HttpGet("getAll")]
        public async Task<ActionResult<SaleFeeIncomeDto>> GetAll(int id)
        {
            var response = await _feeService.GetAll(id);
            return this.ToActionResult(response);
        }

        [HttpGet("getById")]
        public async Task<ActionResult> GetById(int id)
        {
            var response = await _feeService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody] FeeDto feeDto)
        {
            var user = this.GetUser();
            var response = await _feeService.Add(user, feeDto);
            return this.ToActionResult(response);
        }

        [HttpGet("getAllByIdMember")]
        public ActionResult GetAllByIdMember(int id)
        {
            var response = _feeService.GetAllByIdMember(id);
            var listFees = ((IEnumerable)response.Result).Cast<Fee>().ToList();
            return Ok(listFees);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _feeService.Delete(id);
            return this.ToActionResult(response);
        }

    }
}
