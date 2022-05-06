using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestHeartRateExercise
    {
        public int Id { get; set; }
        public string Time { get; set; }
        public int InitialHeartRate { get; set; }
        public int FinalHeartRate { get; set; }
        public int TestMemberId { get; set; }
        public int TestExerciseMemberId { get; set; }
    }
}
