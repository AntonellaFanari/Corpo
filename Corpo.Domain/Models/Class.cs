using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Class
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Personalized { get; set; }
        public List<Plan> Plans { get; set; }
    }
}
