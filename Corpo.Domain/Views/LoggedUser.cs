using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Views
{
    public class LoggedUser
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string RoleName { get; set; }
        public int RoleId { get; set; }
        public UserType UserType { get; set; }
        public List<string> Access { get; set; }
    }
}
