using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("add")]
        public ActionResult Add(Account account)
        {
            var response = _accountService.Add(account);
            return this.ToActionResult(response);
        }

        [HttpPost("logIn")]
        public IActionResult LogIn([FromBody]Account account)
        {
            var response = _accountService.LogIn(account);
            if (response.Success && response.Message == "user")
            {
                var user = response.Result as UserAccessDto;

                var userLogged = UserLoggedDto.FromDomainUser(user);
                return this.BuildToken(userLogged);
            }
            if (response.Success && response.Message == "member")
            {
                var member = response.Result as Member;
                var userLogged = UserLoggedDto.FromDomainMember(member);
                return this.BuildToken(userLogged);
            }
            return this.ToActionResult(response);
        }

        private IActionResult BuildToken(LoggedUser loggedUser)
        {
            var claims = new[]
            {
                new Claim("user", JsonConvert.SerializeObject(loggedUser))
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Llave_super_secreta"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);



            var expiration = DateTime.UtcNow.AddDays(7);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: "yourdomain.com",
               audience: "yourdomain.com",
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = loggedUser
            });

        }
    }
}
