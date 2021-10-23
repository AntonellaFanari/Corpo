using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class HistoryMedical
    {
        public int Id { get; set; }
        public string Gender { get; set; }
        public string Period { get; set; }
        public decimal Weight { get; set; }
        public string Allergies { get; set; }
        public string HeartDisease { get; set; }
        public string RespiratoryDisease { get; set; }
        public string HabitualMedication { get; set; }
        public string SurgicalIntervention { get; set; }
        public List<Injury> Injury { get; set; }
        public string Observations { get; set; }
    }
}
