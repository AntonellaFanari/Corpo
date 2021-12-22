using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Supplier { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public List<DetailPurchase> DetailPurchase { get; set; }
    }
}
