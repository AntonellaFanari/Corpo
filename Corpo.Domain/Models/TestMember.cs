using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestMember
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int MemberId { get; set; }
        public virtual List<TestHeartRateExercise> TestHeartRateExercises { get; set; }
        public virtual List<TestRepetitionExercise> TestRepetitionExercises { get; set; }
        public virtual List<TestVideoExercise> TestVideoExercises { get; set; }
    }
}
