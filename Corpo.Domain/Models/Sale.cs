using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public virtual Member Member { get; set; }
        public int MemberId { get; set; }
        public virtual List<DetailsSale> DetailsSale { get; set; }
        public decimal Total { get; set; }
        public Status Status { get; set; }
    }
}
