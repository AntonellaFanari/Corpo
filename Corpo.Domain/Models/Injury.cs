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
        public HistoryMedical History { get; set; }
        public int HistoryMedicalId { get; set; }
        public List<File> File { get; set; }

    }
}
