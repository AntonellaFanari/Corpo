﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class ResultsWodGroupMemberDto
    {
        public int Id { get; set; }
        public string GroupIndex { get; set; }
        public int Time { get; set; }
        public int Rounds { get; set; }
        public int Repetitions { get; set; }
        public List<ResultsWodGroupMemberExercise> ResultsWodGroupMemberExercise { get; set; }
    }
}