using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class ResultsWodGroupMember
    {
        public int Id { get; set; }
        public int WodMemberId { get; set; }
        public string Modality { get; set; }
        public string GroupIndex { get; set; }
        public int Time { get; set; }
        public int Rounds { get; set; }
        public int Repetitions { get; set; }
        public virtual List<ResultsWodGroupMemberExercise> ResultsWodGroupMemberExercise { get; set; }
    }
}
