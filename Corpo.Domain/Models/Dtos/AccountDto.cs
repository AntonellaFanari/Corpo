using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class AccountDto
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }

    }
}
