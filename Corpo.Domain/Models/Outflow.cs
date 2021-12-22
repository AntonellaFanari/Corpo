using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Outflow
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual OutflowType OutflowType { get; set; }
        public int OutflowTypeId { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public decimal Pay { get; set; }
    }
}
