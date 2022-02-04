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
    [Route("api/wod-member")]
    [ApiController]
    public class WodMemberController : CorpoBaseController
    {
        private IWodMemberService _wodMemberService;

        public WodMemberController(IWodMemberService wodMemberService)
        {
            _wodMemberService = wodMemberService;
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] WodMember wodMember)
        {
            var response = await _wodMemberService.Add(wodMember);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] WodMember wodMember)
        {
            var response = await _wodMemberService.Update(wodMember);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = _wodMemberService.Delete(id);
            return Ok();
        }

        [HttpGet("{id}/{from}/{to}")]
        public async Task<ActionResult<List<WodMember>>> GetAllWodMember(int id, DateTime from, DateTime to)
        {
            var response = await _wodMemberService.GetAllWodMember(id, from, to);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<WodMember>>> GetAllWodMemberWeek()
        {
            var user = GetUser();
            var response = await _wodMemberService.GetAllWodMemberWeek(user.Id);
            return this.ToActionResult(response);
        }

    }
}
