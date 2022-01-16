using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class PayCancelBalanceDto
    {
        public int Id { get; set; }
        public decimal PositiveBalance { get; set; }
        public decimal Pay { get; set; }
    }
}
