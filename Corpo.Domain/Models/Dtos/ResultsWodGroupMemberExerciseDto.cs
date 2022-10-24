using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class ResultsWodGroupMemberExerciseDto
    {
        public int Id { get; set; }
        public int WodGroupMemberId { get; set; }
        public List<int> Times { get; set; }
        public int Rounds { get; set; }
        public int Amount { get; set; }
    }
}
