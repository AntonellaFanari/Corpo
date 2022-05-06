using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class TestMember
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public int MemberId { get; set; }
        public List<TestExerciseMember> TestExercisesMember { get; set; }
        public StatusTest Status { get; set; }
        public int TestTemplateId { get; set; }
    }

    public enum StatusTest
    {
        Executed = 1,
        Pending = 2
    }
}
