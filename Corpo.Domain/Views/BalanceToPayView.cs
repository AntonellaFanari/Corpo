using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Views
{
    public class BalanceToPayView
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public int IdMember { get; set; }
        public decimal Balance { get; set; }
        public Statement Statement { get; set; }
        public decimal Pay { get; set; }
    }
}
