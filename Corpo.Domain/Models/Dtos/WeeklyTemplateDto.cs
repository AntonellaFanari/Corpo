using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class WeeklyTemplateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Goal { get; set; }
        public List<WodTemplate> WodTemplates { get; set; }
    }
}
