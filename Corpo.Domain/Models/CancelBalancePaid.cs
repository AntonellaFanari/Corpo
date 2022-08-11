using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class CancelBalancePaid
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Reason { get; set; }
        public virtual BalancePaid BalancePaid { get; set; }
        public int BalancePaidId { get; set; }
        public decimal Pay { get; set; }
        public int UserId { get; set; }
    }
}
