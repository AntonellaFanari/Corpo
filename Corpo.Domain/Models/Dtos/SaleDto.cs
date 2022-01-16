using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class SaleDto
    {
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public int MemberId { get; set; }
        public virtual List<DetailsSale> DetailsSale { get; set; }
        public decimal Total { get; set; }
        public decimal Pay { get; set; }
        public Status Status { get; set; }
        public TransactionType Transaction { get; set; }
        public int transactionId { get; set; }
        public decimal Balance { get; set; }
        public decimal PositiveBalance { get; set; }
    }
}
