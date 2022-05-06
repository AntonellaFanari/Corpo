using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestExerciseMember
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TestType TestType { get; set; }
        public int? Minutes { get; set; }
        public int? Seconds { get; set; }
        public string? Video { get; set; }
        public virtual TestMember TestMember { get; set; }
        public int TestMemberId { get; set; }
        public StatusTest Status { get; set; }
        public virtual TestHeartRateExercise TestHeartRateExercise { get; set; }
        public virtual TestRepetitionExercise TestRepetitionExercise { get; set; }
        public virtual TestVideoExercise TestVideoExercise { get; set; }
    }
}
