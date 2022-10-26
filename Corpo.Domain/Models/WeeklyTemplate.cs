using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class WeeklyTemplate
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Goal { get; set; }
        public List<WeeklyWodTemplate> WeeklyWodTemplates { get; set; }
    }
}
