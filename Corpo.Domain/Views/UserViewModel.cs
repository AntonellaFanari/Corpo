using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Views
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string NameRole { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
