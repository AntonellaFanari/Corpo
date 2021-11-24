using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class CancelSale
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Reason { get; set; }
        public virtual Sale Sale { get; set; }
        public int SaleId { get; set; }
        public decimal Total { get; set; }
        public int UserId { get; set; }

    }
}
