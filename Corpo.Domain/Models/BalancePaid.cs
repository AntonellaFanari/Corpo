using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class BalancePaid
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public int MemberId { get; set; }
        public List<BalanceToPay> BalancesToPay { get; set; }
        public decimal Pay { get; set; }
        public Status Status { get; set; }
        public IncomeType IncomeType { get; set; }


    }
}
