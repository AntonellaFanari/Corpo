using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestExercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TestType TestType { get; set; }
        public int? Minutes { get; set; }
        public int? Seconds { get; set; }
        public string? Video { get; set; }
        public virtual TestTemplate TestTemplate { get; set; }
        public int TestTemplateId { get; set; }
    }

    public enum TestType
    {
        HeartRate = 1,
        Repetition = 2,
        video = 3
    }
}
