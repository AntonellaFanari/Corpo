using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class ReservationDto
    {
        public string NamePlan { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime FeeDate { get; set; }
        public DateTime Expiration { get; set; }
        public List<AttendanceReservationDto> Reservations { get; set; } = new List<AttendanceReservationDto>();
    }
}
