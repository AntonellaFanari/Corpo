using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class SaleFeeIncomeDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Pay { get; set; }
        public IncomeType IncomeType { get; set; }
    }

    public enum IncomeType
    {
        sale = 1,
        paySale = 2,
        fee = 3,
        payFee = 4 
    }
}
