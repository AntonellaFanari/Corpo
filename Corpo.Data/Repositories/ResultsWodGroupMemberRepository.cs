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
            //var listWodGroup = await _context.WodGroupMember.Include(x => x.ResultsWodGroupMemberExercise).Where(x => x.WodMemberId == id).ToListAsync();
            //var listIndex = new List<string>();
            //foreach (var wodGroup in listWodGroup)
            //{
            //    listIndex.Add(wodGroup.GroupIndex);
            //};
            //listIndex.Distinct().ToList();
            //var listResultWodGroup = new List<ResultsWodGroupMemberDto>();
            //foreach (var index in listIndex)
            //{
            //    var resultsGroup = await _context.ResultsWodGroupMember.FirstOrDefaultAsync(x => x.GroupIndex == index);
            //    var result = new ResultsWodGroupMemberDto {
            //    Id = resultsGroup.Id,
            //    Rounds = resultsGroup.Rounds,
            //    Time = resultsGroup.Time,
            //    Repetitions = resultsGroup.Repetitions,
            //    ResultsWodGroupMemberExercise = listWodGroup.Where(x => x.GroupIndex == index)}

            //}
            

            var list = new List<ResultsWodGroupMemberDto>();
            return list;
        }
    }
}
