using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestTemplate
    {
        public int Id { get; set; }
        public int Level { get; set; }
        public  List<TestExercise> TestExercises { get; set; }
    }
}
