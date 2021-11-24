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
        public virtual Product Product { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Cost { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
    }
}
