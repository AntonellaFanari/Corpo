using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Plan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Credits { get; set; }
        public decimal Price { get; set; }
        public PlanType Type { get; set; }
        public List<Class> Class { get; set; }

    }
}
