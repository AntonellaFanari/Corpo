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
    public class MemberController : ControllerBase
    {
        private IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet("getAll")]
        public ActionResult<MemberViewModel> GetAll()
        {
            var response = _memberService.GetAll();
            var result = ((IEnumerable)response.Result).Cast<Member>().ToList();
            var listMembers = ViewModels.ViewModels.FromDomainMember(result);
            return Ok(listMembers);
        }

        [HttpGet("getById")]
        public ActionResult<MemberViewModel> GetById(int id)
        {
            var member = ViewModels.ViewModels.FromDomainMember(_memberService.GetById(id));
            return Ok(member);
        }

        [HttpPost("Add")]
        public ActionResult Add([FromBody]MemberDto member)
        {
            var response = _memberService.Add(member);
            return this.ToActionResult(response);
        }
    }
}
