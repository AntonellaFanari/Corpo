using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Fee
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual Member Member { get; set; }
        public int MemberId { get; set; }
        public int Credits { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string PlanName { get; set; }
        public virtual Promotion Promotion { get; set; }
        public int? PromotionId { get; set; }
        public decimal TotalPromotion { get; set; }
        public decimal Total { get; set; }
        public decimal Pay { get; set; }

    }
}
