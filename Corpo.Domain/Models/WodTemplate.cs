using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class WodTemplate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Goal { get; set; }
        public virtual List<WodGroup> WodGroups { get; set; }
    }
}
