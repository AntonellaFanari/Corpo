using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using Corpo.Web.Controllers.ExtensionMethods;
using Corpo.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : CorpoBaseController
    {
        private IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet("getAll")]
        public ActionResult<MemberListViewModel> GetAll()
        {
            var response = _memberService.GetAll();
            var result = ((IEnumerable)response.Result).Cast<Member>().ToList();
            var listMembers = ViewModels.ViewModels.FromDomainMemberList(result);
            return Ok(listMembers);
        }

        [HttpGet("getById")]
        public async Task<ActionResult<ViewModels.MemberViewModel>> GetById(int? id)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            var response = await _memberService.GetById(userId);
            var member = ViewModels.ViewModels.FromDomainMember(response.Result as Member);
            return Ok(member);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody] MemberDto member)
        {
            var response = _memberService.Add(member);
            return this.ToActionResult(response);
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(int id, [FromBody] Member member)
        {
            var response = await _memberService.Update(id, member);
            return this.ToActionResult(response);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _memberService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpGet("by-date-expiration")]
        public async Task<ActionResult<MemberListViewModel>> ByDateExpiration(DateTime from, DateTime to)
        {
            var response = await _memberService.ByDateExpiration(from, to);
            var result = ((IEnumerable)response.Result).Cast<Member>().ToList();
            var listMembers = ViewModels.ViewModels.FromDomainMemberList(result);
            return Ok(listMembers);
        }

        [HttpPut("updateDueDate")]
        public async Task<ActionResult> UpdateDueDate(CreditExpirationDto expiration)
        {
            var response = await _memberService.UpdateDueDate(expiration);
            return this.ToActionResult(response);
        }

        [HttpGet("personalized")]
        public async Task<ActionResult<List<MemberListViewModel>>> GetPersonalized()
        {
            var response = await _memberService.GetPersonalized();
            var result = ((IEnumerable)response.Result).Cast<Member>().ToList();
            var listMembers = ViewModels.ViewModels.FromDomainMemberList(result);
            return Ok(listMembers);
        }

        [HttpPost("addMedicalHistory")]
        public ActionResult AddMedicalHistory(int? memberId, [FromBody] MedicalHistory medicalHistory)
        {
            int userId = 0;
            if (memberId == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = memberId.Value;
            }
            var response = _memberService.AddMedicalHistory(userId, medicalHistory);
            return this.ToActionResult(response);
        }

        [HttpGet("getMedicalHistoryByIdMember")]
        public ActionResult GetMedicalHistoryByIdMember(int? id)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            var response = _memberService.GetMedicalHistoryByIdMember(userId);
            return this.ToActionResult(response);
        }

        [HttpGet("getMedicalHistoryById")]
        public ActionResult GetMedicalHistoryById(int id)
        {
            var response = _memberService.GetMedicalHistoryById(id);
            return this.ToActionResult(response);
        }

        [HttpPut("updateMedicalHistory")]
        public ActionResult UpdateMedicalHistory(int id, [FromBody] MedicalHistory medicalHistory)
        {
            var response = _memberService.UpdateMedicalHistory(id, medicalHistory);
            return this.ToActionResult(response);
        }

        [HttpGet("getAge")]
        public async Task<ActionResult> GetAge(int? id)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            var response = await _memberService.GetAge(userId);
            return this.ToActionResult(response);
        }

        [HttpGet("exists-medical-history")]
        public async Task<ActionResult> GetExistsMedicalHistory(int id)
        {
            var response = await _memberService.GetExistsMedicalHistory(id);
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


        [HttpGet("download")]
        public async Task<FileStreamResult> Download(string fileName)
        {
            var memory = new MemoryStream();
            try
            {
                var path = Path.Combine("wwwroot", fileName);
                using (var stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                return new FileStreamResult(memory, GetContentType(path))
                {
                    FileDownloadName = path
                };
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        [HttpGet("level")]
        public async Task<ActionResult> GetLevel(int? id)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            var response = await _memberService.GetLevel(userId);
            return this.ToActionResult(response);
        }

        [HttpGet("levels-history")]
        public async Task<ActionResult> GetLevelsHistory(int? id)
        {
            int userId = 0;
            if (id == null)
            {
                var user = GetUser();
                userId = user.Id;
            }
            else
            {
                userId = id.Value;
            }
            var response = await _memberService.GetLevelsHistory(userId);
            return this.ToActionResult(response);
        }

        private string GetContentType(string path)
        {
            var ext = Path.GetExtension(path).ToLowerInvariant();
            if (_mimeTypes.ContainsKey(ext)) return _mimeTypes[ext];
            return "application/octet-stream";
        }

        private static Dictionary<string, string> _mimeTypes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".txt", "text/plain" },
            { ".pdf", "application/pdf" },
            { ".doc", "application/vnd.ms-word" },
            { ".docx", "application/vnd.ms-word" },
            { ".xls", "application/vnd.ms-excel" },
            { ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            { ".png", "image/png" },
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".gif", "image/gif" },
            { ".csv", "text/csv" }
        };
    }

}
