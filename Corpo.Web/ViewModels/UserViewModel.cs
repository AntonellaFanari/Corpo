using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Corpo.Web.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string RoleName { get; set; }
        public int RoleId { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

    }
}
