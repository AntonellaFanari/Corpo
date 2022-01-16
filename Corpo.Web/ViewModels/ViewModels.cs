using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.ViewModels
{
    public static class ViewModels
    {
        public static UserViewModel FromDomainUser(User user)
        {
            return new UserViewModel()
            {
                Id = user.Id,
                LastName = user.LastName,
                Name = user.Name,
                BirthDate = user.BirthDate,
                Address = user.Address,
                RoleName = user.Role.Name,
                RoleId = user.RoleId,
                Phone = user.Phone,
                Email = user.Account.Email
            };
        }

        public static List<UserViewModel> FromDomainUser(List<User> users)
        {
            return users.Select(x => FromDomainUser(x)).ToList();
        }

        public static MemberViewModel FromDomainMember(Member member)
        {
            return new MemberViewModel()
            {
                Id = member.Id,
                LastName = member.LastName,
                Name = member.Name,
                BirthDate = member.BirthDate,
                Address = member.Address,
                Phone = member.Phone,
                EmergencyContact = member.EmergencyContact,
                EmergencyPhone = member.EmergencyPhone,
                SocialSecurity = member.SocialSecurity,
                NamePlan = member.Plan.Name,
                PlanId = member.PlanId,
                Instagram = member.Instagram,
                Facebook = member.Facebook,
                Email = member.Account.Email,
                PlanType = (int)member.Plan.Type,
                CreditId = member.Credit.Id,
                Credit = member.Credit.InitialCredit,
                Negative = member.Credit.Negative,
                Expiration = member.Credit.Expiration
            };
        }

        public static List<MemberViewModel> FromDomainMember(List<Member> members)
        {
            return members.Select(x => FromDomainMember(x)).ToList();
        }
    }
}
