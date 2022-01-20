using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Shift
    {
        public int Id { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int Quota { get; set; }
        public int Available { get; set; }
        public virtual Class Class { get; set; }
        public int ClassId { get; set; }
        public TimeSpan Hour { get; set; }
        public DateTime Day { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
    }
}
