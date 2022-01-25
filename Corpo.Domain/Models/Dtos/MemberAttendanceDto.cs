using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class MemberAttendanceDto
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string Name { get; set; }
        public int RemainingCredit { get; set; }
        public DateTime Expiration { get; set; }
        public int CreditId { get; set; }
        public bool Attended { get; set; }
        public StatusAttendance Status { get; set; }

    }
}
