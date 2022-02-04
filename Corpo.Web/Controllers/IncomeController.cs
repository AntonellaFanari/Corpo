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
    public class IncomeController : CorpoBaseController
    {
        private IIncomeService _incomeService;

        public IncomeController(IIncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Income income)
        {
            var user = GetUser();
            var response = await _incomeService.Add(user.Id, income);
            return this.ToActionResult(response);
        }

        [HttpGet]
        async public Task<ActionResult<Income>> GetAll(int id)
        {
            var response = await _incomeService.GetAll(id);
            var list = ((IEnumerable)response.Result).Cast<Income>().ToList();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Income>> GetById(int id)
        {
            var response = await _incomeService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _incomeService.Delete(id);
            return this.ToActionResult(response);
        }
    }
}
