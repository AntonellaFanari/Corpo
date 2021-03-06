using System;
using System.Collections.Generic;
using System.Linq;
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
        public string Units { get; set; }
        public string GroupIndex { get; set; }
        public string Mode { get; set; }
        public decimal? Value { get; set; }
        public virtual WodTemplate WodTemplate { get; set; }
        public int WodTemplateId { get; set; }

    }
}
