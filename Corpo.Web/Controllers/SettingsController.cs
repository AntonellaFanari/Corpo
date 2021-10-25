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
    public class SettingsController : ControllerBase
    {
        private ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet("getRoleAcces")]
        public ActionResult GetRoleAcces()
        {
            var response = _settingsService.GetRoleAcces();
            return this.ToActionResult(response);
        }

        [HttpPost("saveAcces")]
        public ActionResult SaveAcces(List<RoleAcces> acces)
        {
            var response = _settingsService.SaveAcces(acces);
            return Ok(response);
        }
    }
}
