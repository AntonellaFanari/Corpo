using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.ViewModels
{
    public class MemberListViewModel
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string NamePlan { get; set; }
        public PlanType PlanType { get; set; }
        public int PlanId { get; set; }
        public int CreditId { get; set; }
        public int Credit { get; set; }
        public DateTime Expiration { get; set; }
        public int Negative { get; set; }

    }
}
