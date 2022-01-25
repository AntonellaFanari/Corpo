using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class MembersStatisticsDto
    {
        public int InactiveMembers { get; set; }
        public int Active { get; set; }
        public int CloseToInactive { get; set; }
        public int News { get; set; }
        public int FistMonthInactive { get; set; }
        public int secondMonthInactive { get; set; }
        public int ThirdMonthInactive { get; set; }
        public int ReEntrants { get; set; }
    }
}
