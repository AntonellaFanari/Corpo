using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual CategoryExercise CategoryExercise { get; set; }
        public int CategoryExerciseId { get; set; }
        public string Video { get; set; }
        public List<Tag> Tags { get; set; }
    }
}
