using Corpo.Domain.Models;
using System.Collections.Generic;
using System.Linq;

namespace Corpo.Web.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string NameRole { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public static UserViewModel FromDomain(User user)
        {
            return new UserViewModel
            {
                Id = user.Id,
                LastName = user.LastName,
                Name = user.Name,
                NameRole = user.Role.Name,
                Phone = user.Phone,
                Email = user.Email
            };
        }

        public static List<UserViewModel> FromDomain(List<User> users)
        {
            return users.Select(x => FromDomain(x)).ToList();
        }
    }
}
