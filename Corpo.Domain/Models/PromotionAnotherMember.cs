using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class PromotionAnotherMember
    {
        public int Id { get; set; }
        public int Discount { get; set; }
        public virtual Promotion Promotion { get; set; }
        public int PromotionId { get; set; }
    }
}
