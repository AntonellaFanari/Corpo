using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class FeeDto
    {
        public string UserName { get; set; }
        public int UserId { get; set; }
        public int MemberId { get; set; }
        public int Credits { get; set; }
        public int CreditId { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string PlanName { get; set; }
        public int? PromotionId { get; set; }
        public decimal TotalPromotion { get; set; }
        public decimal Total { get; set; }
        public decimal Pay { get; set; }
        public int InitialCredit { get; set; }
        public int CreditConsumption { get; set; }
        public int Negative { get; set; }
        public TransactionType Transaction { get; set; }
        public decimal Balance { get; set; }
        public List<MemberPromotion> MembersPromotion { get; set; }

    }

    public class MemberPromotion
    {
        public int MemberId { get; set; }
        public int Discount { get; set; }

    }
}
