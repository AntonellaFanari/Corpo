using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class ResultsWodGroupMemberRepository: IResultsWodGroupMemberRepository
    {
        private CorpoContext _context;

        public ResultsWodGroupMemberRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task AddResultsWodGroup(List<ResultsWodGroupMember> results)
        {
            foreach (var result in results)
            {
                _context.ResultsWodGroupMember.Add(result);
                await _context.SaveChangesAsync();
            }

        }

        public async Task AddResultsWodGroupExercise(List<ResultsWodGroupMemberExercise> results)
        {
            try
            {
                foreach (var result in results)
                {
                    _context.ResultsWodGroupMemberExercise.Add(result);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public async Task<List<ResultsWodGroupMemberDto>> GetByWodId(int id)
        {
          return await _context.ResultsWodGroupMember.Include(x => x.ResultsWodGroupMemberExercise).Where(x => x.WodMemberId == id).Select(
              x => new ResultsWodGroupMemberDto
              {
                  Id = x.Id,
                  WodMemberId = x.WodMemberId,
                  GroupIndex = x.GroupIndex,
                  Modality = x.Modality,
                  Rounds = x.Rounds,
                  Repetitions = x.Repetitions,  
                  Time = x.Time,
                  ResultsWodGroupMemberExercise = new List<ResultsWodGroupMemberExerciseDto>()
              }).ToListAsync();
            
        }
    }
}
