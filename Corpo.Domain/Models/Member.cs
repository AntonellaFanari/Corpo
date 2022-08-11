using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Member
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
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime? ReEntryDate { get; set; }
        public Plan Plan { get; set; }
        public int PlanId { get; set; }
        public virtual Account Account { get; set; }
        public int AccountId { get; set; }
        public List<Sale> Sale { get; set; }
        public List<Fee> Fee { get; set; }
        public Credit Credit { get; set; }
        public int CreditId { get; set; }
        public List<Attendance> Attendance { get; set; }
        public StatusMember Status { get; set; }
    }

    public enum StatusMember
    {
        Active = 1,
        NotActive = 2,
        FirstDay = 3
    }
}
