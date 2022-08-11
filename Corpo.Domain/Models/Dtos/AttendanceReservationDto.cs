using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class AttendanceReservationDto
    {
        public int Id { get; set; }
        public int ShiftId { get; set; }
        public Shift Shift { get; set; }
        public DateTime DateShift { get; set; }
        public StatusAttendance Status { get; set; }
        public DateTime DateReservation { get; set; }
        public DateTime? DateCancellation { get; set; }
        public bool UsingNegative { get; set; }
        public bool ReturnCredit { get; set; }
        public Class Class { get; set; }
    }
}
