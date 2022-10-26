using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class WeeklyWodTemplate
    {
        public int Id { get; set; }
        public virtual WeeklyTemplate WeeklyTemplate { get; set; }
        public int WeeklyTemplateId { get; set; }
        public int WodTemplateId { get; set; }

    }




}
