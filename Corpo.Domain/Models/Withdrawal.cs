using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Withdrawal
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual WithdrawalName WithdrawalName { get; set; }
        public int WithdrawalNameId { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
    }
}
