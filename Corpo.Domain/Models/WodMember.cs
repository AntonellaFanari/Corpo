using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class WodMember
    {
        public int Id { get; set; }
        public string Goal { get; set; }
        public virtual List<WodGroupMember> WodGroupsMember { get; set; }
        public int MemberId { get; set; }
        public DateTime Date { get; set; }
        public string Detail { get; set; }
        public int Rate { get; set; }
    }
}
