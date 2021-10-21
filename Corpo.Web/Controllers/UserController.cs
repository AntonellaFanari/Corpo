using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Corpo.Domain.Views;
using Corpo.Web.ViewModels;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getRoles")]
        public ActionResult<List<Role>> GetRoles()
        {
            var listRoles = _userService.GetRoles();
            return Ok(listRoles);

        }

        [HttpGet("getAll")]
        public ActionResult<UserView> GetAll()
        {
            var listUsers =UserViewModel.FromDomain(_userService.GetAll());
            return Ok(listUsers);
        }
    }
}
