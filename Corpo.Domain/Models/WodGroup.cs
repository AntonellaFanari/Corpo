using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class WodGroup
    {
        public int Id { get; set; }
        public virtual Exercise Exercise { get; set; }
        public int ExerciseId { get; set; }
        public virtual Modality Modality { get; set; }
        public int ModalityId { get; set; }
        public string Detail { get; set; }
        public int? Rounds { get; set; }
        public int? Series { get; set; }
        public int? Time { get; set; }
        public string UnitType { get; set; }
        public string Units { get; set; }
        public string GroupIndex { get; set; }
        public string IntensityType { get; set; }
        public int IntensityValue { get; set; }
        public string StaggeredType { get; set; }
        public int? StaggeredValue { get; set; }
        public int? TimeWork { get; set; }
        public int? TimeRest { get; set; }
        public int? PauseBetweenRounds { get; set; }
        public int? PauseBetweenExercises { get; set; }
        public virtual WodTemplate WodTemplate { get; set; }
        public int WodTemplateId { get; set; }

    }
}
