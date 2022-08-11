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
        public int WodNumber { get; set; }
        public int PeriodizationId { get; set; }
        public int WeekNumber { get; set; }
        public string Detail { get; set; }
        public int Rate { get; set; }
        public string Attended { get; set; }
        public int Rest { get; set; }
        public IntensityType IntensityType { get; set; }
        public int Intensity { get; set; }
        public DateTime? ShiftDate { get; set; }
    }
}
