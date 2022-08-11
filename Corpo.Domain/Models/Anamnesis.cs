using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Anamnesis
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int Level { get; set; }
        public bool CurrentlyPhysicalActivity { get; set; }
        public bool Competitive { get; set; }
        public string Sport { get; set; }
        public int NumberTrainingSessionsWeek { get; set; }
        public int HoursTrainingSessionsWeek { get; set; }
        public bool CurrentlyStrengthTraining { get; set; }
        public int NumberStrengthTrainingSessionsWeek { get; set; }
        public int HoursStrengthTrainingSessionsWeek { get; set; }
        public bool StrengthTrainingInThePast { get; set; }
        public string TimeSinceLastTraining { get; set; }
        public bool ConstantfollowUpSpreadsheet { get; set; }
        public bool RecreationalAndSporadic { get; set; }
        public bool PhysicalActivityInThePast { get; set; }
        public string TrainingType { get; set; }

    }
}
