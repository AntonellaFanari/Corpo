using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class WodGroupMember
    {
        public int Id { get; set; }
        public virtual Exercise Exercise { get; set; }
        public int ExerciseId { get; set; }
        public virtual Modality Modality { get; set; }
        public int ModalityId { get; set; }
        public string Detail { get; set; }
        public string Units { get; set; }
        public string GroupIndex { get; set; }
        public virtual WodMember WodMember { get; set; }
        public int WodMemberId { get; set; }
    }
}
