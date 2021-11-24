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

        [HttpPost("add")]
        public ActionResult Add([FromBody]MemberDto member)
        {
            var response = _memberService.Add(member);
            return this.ToActionResult(response);
        }

        [HttpPut("update")]
        public ActionResult Update(int id, [FromBody]Member member)
        {
            var response = _memberService.Update(id, member);
            return this.ToActionResult(response);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _memberService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpPost("addMedicalHistory")]
        public ActionResult AddMedicalHistory(int memberId, [FromBody] MedicalHistory medicalHistory)
        {
            var response = _memberService.AddMedicalHistory(memberId, medicalHistory);
            return this.ToActionResult(response);
        }

        [HttpGet("getMedicalHistoryByIdMember")]
        public ActionResult GetMedicalHistoryByIdMember(int id)
        {
            var response = _memberService.GetMedicalHistoryByIdMember(id);
            return this.ToActionResult(response);
        }

        [HttpGet("getMedicalHistoryById")]
        public ActionResult GetMedicalHistoryById(int id)
        {
            var response = _memberService.GetMedicalHistoryById(id);
            return this.ToActionResult(response);
        }

        [HttpPut("updateMedicalHistory")]
        public ActionResult UpdateMedicalHistory(int id, [FromBody]MedicalHistory medicalHistory)
        {
            var response = _memberService.UpdateMedicalHistory(id, medicalHistory);
            return this.ToActionResult(response);
        }

        [HttpGet("getAge")]
        public ActionResult GetAge(int id)
        {
            var response = _memberService.GetAge(id);
            return this.ToActionResult(response);
        }

        [HttpPost("addInjury")]
        public ActionResult AddInjury(Injury injury)
        {
            var response = _memberService.AddInjury(injury);
            return this.ToActionResult(response);
        }

        [HttpPost("{id}/addFile")]
        public ActionResult AddFile(int id, List<IFormFile> files)
        {
            var response = _memberService.AddFile(id, files);
            return this.ToActionResult(response);
        }
        
        [HttpGet("getAllinjuries")]
        public ActionResult GetAllInjuries(int id)
        {
            var response = _memberService.GetAllInjuries(id);
            var listInjuries = ((IEnumerable)response.Result).Cast<Injury>().ToList();
            return Ok(listInjuries);
        }

        [HttpGet("getAllFiles")]
        public ActionResult GetAllFiles(int id)
        {
            var response = _memberService.GetAllFiles(id);
            return this.ToActionResult(response);
        }

        [HttpDelete("deleteFile")]
        public ActionResult DeleteFile(int id)
        {
            var response = _memberService.DeleteFile(id);
            return this.ToActionResult(response);
        }

        //[HttpGet("download")]
        //public FileResult Download(string fileName) 
        //{
        //    return _memberService.Download(fileName);
        //}

    }
}
