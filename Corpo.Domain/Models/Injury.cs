using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Injury
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MedicalHistory History { get; set; }
        public int MedicalHistoryId { get; set; }
        public List<File> Files { get; set; }

    }
}
