using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IResultsWodGroupMemberRepository
    {
        Task AddResultsWodGroup(List<ResultsWodGroupMember> listResults);
        Task AddResultsWodGroupExercise(List<ResultsWodGroupMemberExercise> listResults);
        Task<List<ResultsWodGroupMemberDto>> GetByWodId(int id);
    }
}
