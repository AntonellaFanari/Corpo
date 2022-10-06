using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class ResultsWodGroupMemberExercise
    {
        public int Id { get; set; }
        public virtual WodGroupMember WodGroupMember { get; set; }
        public int WodGroupMemberId { get; set; }
        public int Time { get; set; }
        public int Rounds { get; set; }
        public int Repetitions { get; set; }

    }
}
