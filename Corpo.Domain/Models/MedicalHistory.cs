using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class MedicalHistory
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
        public List<Injury> Injuries { get; set; }
        public string Observations { get; set; }
        public virtual Member Member { get; set; }
        public int MemberId { get; set; }
    }
}
