using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

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
        public ActionResult<UserViewModel> GetAll()
        {
            var listUsers = ViewModels.ViewModels.FromDomainUser(_userService.GetAll());
            return Ok(listUsers);
        }

        [HttpGet("getById")]
        public ActionResult<UserViewModel> GetById(int id)
        {
            var user = ViewModels.ViewModels.FromDomainUser(_userService.GetById(id));
            return Ok(user);
        }

        [HttpGet("getAllByNameRole")]
        public ActionResult GetAllByNameRole(string role)
        {
            var response = _userService.GetAllByNameRole(role);
            var list = ((IEnumerable)response.Result).Cast<User>().ToList();
            return Ok(list);
        }

        [HttpPost("[action]")]
        public ActionResult Add([FromBody]UserDto user)
        {
           var response = _userService.Add(user);
            return this.ToActionResult(response);
        }

        [HttpPut("[action]")]
        public ActionResult Update(int id, User user)
        {
            var response = _userService.Update(id, user);
            return this.ToActionResult(response);
        }

        [HttpDelete("[action]")]
        public ActionResult Delete(int id, string email)
        {
            _userService.Delete(id, email);
            return Ok();
        }
    }
}
