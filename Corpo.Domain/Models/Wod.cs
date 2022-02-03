using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Wod
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<WodGroup> WodGroups { get; set; }
        public int MemberId { get; set; }
        public DateTime Date { get; set; }
        public string Detail { get; set; }
    }
}
