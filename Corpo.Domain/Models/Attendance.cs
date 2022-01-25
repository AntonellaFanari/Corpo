using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public Member Member { get; set; }
        public int MemberId { get; set; }
        public int ShiftId { get; set; }
        public DateTime DateShift { get; set; }
        public DateTime DateReservation { get; set; }
        public DateTime? DateCancellation { get; set; }
        public bool Attended { get; set; }
        public StatusAttendance Status { get; set; }
    }

    public enum StatusAttendance
    {
        Reserved = 1,
        Cancelled = 2
    }
}
