using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Path { get; set; }
    }
}
