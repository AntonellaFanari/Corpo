using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class PeriodizationWeek
    {
        public int Id { get; set; }
        public int WeekNumber { get; set; }
        public int M { get; set; }
        public int S { get; set; }
        public string Monday { get; set; }
        public string Tuesday { get; set; }
        public string Wednesday { get; set; }
        public string Thursday { get; set; }
        public string Friday { get; set; }
        public string Saturday { get; set; }
        public string Sunday { get; set; }
        public Periodization Periodization { get; set; }
        public int PeriodizationId { get; set; }
    }
}
