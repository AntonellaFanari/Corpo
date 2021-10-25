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
    public class MemberController : ControllerBase
    {
        private IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet("getAll")]
        public ActionResult GetAll()
        {
            var response = _memberService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpPost("Add")]
        public ActionResult Add([FromBody]Member member)
        {
            var response = _memberService.Add(member);
            return this.ToActionResult(response);
        }
    }
}
