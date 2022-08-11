using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models.Dtos
{
    public class TestRockportDto
    {
        public int AgeLowerLimit { get; set; }
        public int AgeUpperLimit { get; set; }
        public int NivelBajoLowerLimit { get; set; }
        public int NivelBajoUpperLimit { get; set; }
        public int NivelRegularLowerLimit { get; set; }
        public int NivelRegularUpperLimit { get; set; }
        public int NivelBuenoLowerLimit { get; set; }
        public int NivelBuenoUpperLimit { get; set; }
        public int NivelExcelenteLowerLimit { get; set; }
        public int NivelExcelenteUpperLimit { get; set; }
        public int NivelSuperiorLowerLimit { get; set; }
        public int NivelSuperiorUpperLimit { get; set; }



        public TestRockportDto(int ageLowerLimit, int ageUpperLimit, int nivelBajoLowerLimit, int nivelBajoUpperLimit, int nivelRegularLowerLimit, int nivelRegularUpperLimit, int nivelBuenoLowerLimit, int nivelBuenoUpperLimit, int nivelExcelenteLowerLimit, int nivelExcelenteUpperLimit, int nivelSuperiorLowerLimit, int nivelSuperiorUpperLimit)
        {
            AgeLowerLimit = ageLowerLimit;
            AgeUpperLimit = ageUpperLimit;
            NivelBajoLowerLimit = nivelBajoLowerLimit;
            NivelBajoUpperLimit = nivelBajoUpperLimit;
            NivelRegularLowerLimit = nivelRegularLowerLimit;
            NivelRegularUpperLimit = nivelRegularUpperLimit;
            NivelBuenoLowerLimit = nivelBuenoLowerLimit;
            NivelBuenoUpperLimit = nivelBuenoUpperLimit;
            NivelExcelenteLowerLimit = nivelExcelenteLowerLimit;
            NivelExcelenteUpperLimit = nivelExcelenteUpperLimit;
            NivelSuperiorLowerLimit = nivelSuperiorLowerLimit;
            NivelSuperiorUpperLimit = nivelSuperiorUpperLimit;
        }


    }



    public enum Level
    {
        Bajo = 1,
        Regular = 2,
        Bueno = 3,
        Excelente = 4,
        Superior = 5
    }
}
