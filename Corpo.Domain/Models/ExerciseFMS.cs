using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class ExerciseFMS
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<FileFMS> Files { get; set; }
    }
}
