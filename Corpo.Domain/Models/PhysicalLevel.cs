using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class PhysicalLevel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Level { get; set; }
        public virtual Member Member { get; set; }
        public int MemberId { get; set; }

    }
}
