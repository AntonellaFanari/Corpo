using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class UserAccessDto
    {
        public User User { get; set; }
        public List<RoleAccess> Access { get; set; }
    }
}
