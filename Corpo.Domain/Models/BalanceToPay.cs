using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class BalanceToPay
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual Member Member { get; set; }
        public int MemberId { get; set; }
        public TransactionType Transaction { get; set; }
        public int transactionId { get; set; }
        public decimal Balance { get; set; }
        public decimal Pay { get; set; }
        public Statement Statement { get; set; }
    }
    public enum TransactionType
    {
        Sale = 1,
        Fee = 2
    }

    public enum Statement
    {
        Paid = 1,
        Unpaid = 2,
        Compensated = 3,
        UnCompensated = 4
    }
}

