using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class FileFMS
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public virtual ExerciseFMS ExerciseFMS { get; set; }
        public int ExerciseFMSId { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }
    }
}
