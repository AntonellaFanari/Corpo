using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public static class UserLoggedDto
    {
        public static LoggedUser FromDomainUser(UserAccessDto user)
        {
            return new LoggedUser()
            {
                Id = user.User.Id,
                LastName = user.User.LastName,
                Name = user.User.Name,
                RoleName = user.User.Role.Name,
                RoleId = user.User.RoleId,
                UserType = user.User.Account.UserType,
                Access = user.Access.Select(x =>  x.Access.ToLower() ).ToList(),
                AccountId = user.User.AccountId
            };
        }

        public static LoggedUser FromDomainMember(Member member)
        {
            return new LoggedUser()
            {
                Id = member.Id,
                LastName = member.LastName,
                Name = member.Name,
                RoleName = "member",
                UserType = member.Account.UserType,
                AccountId = member.AccountId
            };
        }
    }
}
