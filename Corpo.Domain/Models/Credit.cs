using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Credit
    {
        public int Id { get; set; }
        public int InitialCredit { get; set; }
        public int CreditConsumption { get; set; }
        public int Negative { get; set; }
        public DateTime Expiration { get; set; }
        public string FirstDay { get; set; }
    }
}
