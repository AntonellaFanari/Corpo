using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class RoleAcces
    {
        public int Id { get; set; }
        public virtual Role Role { get; set; }
        public int RoleId { get; set; }
        public string Acces { get; set; }
    }
}
