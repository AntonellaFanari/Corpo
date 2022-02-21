using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class RecordCashDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Detail { get; set; }
        public decimal Amount { get; set; }
        public string Member { get; set; }
        public string User { get; set; }
        public string Transaction { get; set; }
    }
}
