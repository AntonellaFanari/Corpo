using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Views
{
    public class FeeView
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int InitialCredit { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string PlanName { get; set; }
        public string PromotionName { get; set; }
    }
}
