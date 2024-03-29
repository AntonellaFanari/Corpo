﻿using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.ViewModels
{
    public class MemberViewModel
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string SocialSecurity { get; set; }
        public string EmergencyPhone { get; set; }
        public string EmergencyContact { get; set; }
        public string NamePlan { get; set; }
        public int PlanId { get; set; }
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Email { get; set; }
        public int PlanType { get; set; }
        public int CreditId { get; set; }
        public int Credit { get; set; }
        public DateTime Expiration { get; set; }
        public int Negative { get; set; }
        public StatusMember Status { get; set; }

    }
}
