﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class CreditExpirationDto
    {
        public int Id { get; set; }
        public DateTime Expiration { get; set; }
    }
}
