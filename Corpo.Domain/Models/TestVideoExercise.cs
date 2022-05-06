using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestVideoExercise
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public int TestMemberId { get; set; }
        public int TestExerciseMemberId { get; set; }
    }
}
