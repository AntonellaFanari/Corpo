using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class MembersActivesPlanDto
    {
        public string Month { get; set; }
        public string PlanName { get; set; }
        public int Actives { get; set; }
    }

}
