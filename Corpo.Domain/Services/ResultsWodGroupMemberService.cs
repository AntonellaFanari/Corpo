using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class ResultsWodGroupMemberService: IResultsWodGroupMemberService
    {
        private IResultsWodGroupMemberRepository _resultsWodGroupMemberRepository;

        public ResultsWodGroupMemberService(IResultsWodGroupMemberRepository resultsWodGroupMemberRepository)
        {
            _resultsWodGroupMemberRepository = resultsWodGroupMemberRepository;
        }

        public async Task<DomainResponse> Add(List<ResultsWodGroupMemberDto> results)
        {
            try
            {
                var listResultsWodGroup = new List<ResultsWodGroupMember>();
                foreach (var result in results)
                {
                    var resultsWodGroup = new ResultsWodGroupMember
                    {
                        GroupIndex = result.GroupIndex,
                        Rounds = result.Rounds,
                        Repetitions = result.Repetitions,
                        Time = result.Time
                    };

                    await _resultsWodGroupMemberRepository.AddResultsWodGroupExercise(result.ResultsWodGroupMemberExercise);

                    listResultsWodGroup.Add(resultsWodGroup);

                }

                await _resultsWodGroupMemberRepository.AddResultsWodGroup(listResultsWodGroup);

                return new DomainResponse { Success = true };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudieron guarda los resultados.");
            }
        }

        public async Task<DomainResponse> GetByWodId(int wodId)
        {
            var response = await _resultsWodGroupMemberRepository.GetByWodId(wodId);
            return new DomainResponse { Success = true, Result = response };
        }
    }
}
