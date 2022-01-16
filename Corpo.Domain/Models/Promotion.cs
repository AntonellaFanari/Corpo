using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Promotion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DiscountMainMember { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public virtual List<PromotionAnotherMember> PromotionAnotherMember { get; set; }

    }
}
