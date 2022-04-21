using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestRepetitionExercise
    {
        public int Id { get; set; }
        public int Repetitions { get; set; }
        public int InitialHeartRate { get; set; }
        public int FinalHeartRate { get; set; }
        public virtual TestMember TestMember { get; set; }
        public int TestMemberId { get; set; }
        public virtual TestExercise TestExercise { get; set; }
        public int TestExerciseId { get; set; }
    }
}
