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

        [HttpGet("getRoleAccess")]
        public ActionResult GetRoleAccess()
        {
            var response = _settingsService.GetRoleAccess();
            return this.ToActionResult(response);
        }

        [HttpPost("saveAccess")]
        public ActionResult SaveAccess(List<RoleAccess> access)
        {
            var response = _settingsService.SaveAccess(access);
            return Ok(response);
        }
    }
}
