using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnamnesisController : CorpoBaseController
    {
        private IAnamnesisService _anamnesisService;

        public AnamnesisController(IAnamnesisService anamnesisService)
        {
            _anamnesisService = anamnesisService;
        }

        [HttpPost]
        public async Task<ActionResult> Add(Anamnesis anamnesis) 
        {
            var userId = GetUser().Id;
            var response = await _anamnesisService.Add(userId, anamnesis);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<Anamnesis>> GetByMemberId(int? id)
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
            var response = await _anamnesisService.GetByMemberId(userId);
            return this.ToActionResult(response);
        }

        [HttpGet("level")]
        public async Task<ActionResult> GetLevel(int id)
        {
            var response = await _anamnesisService.GetLevel(id);
            return this.ToActionResult(response);
        }
    }
}
