using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class File
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public virtual Injury Injury { get; set; }
        public int InjuryId { get; set; }
    }
}
