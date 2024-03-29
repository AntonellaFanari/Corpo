﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class Periodization
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public bool Valid { get; set; }
        public string Goal { get; set; }
        public List<PeriodizationWeek> PeriodizationWeeks { get; set; }
        public int Trainings { get; set; }
        public string Volume { get; set; }
        public string TrainingSystem { get; set; }
    }
    
}
