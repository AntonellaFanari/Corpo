using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Cash
    {
        public int Id { get; set; }
        public DateTime Opening { get; set; }
        public DateTime? Closing { get; set; }
        public decimal StartingBalance { get; set; }
        public decimal EndingBalance { get; set; }
        public decimal TotalFee { get; set; }
        public decimal TotalSale { get; set; }
        public decimal TotalWithdrawal { get; set; }
        public decimal TotalOutflow { get; set; }
        public decimal TotalIncome { get; set; }
    }
}
