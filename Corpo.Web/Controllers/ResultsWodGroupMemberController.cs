using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Services;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/results-wod-group-member")]
    [ApiController]
    public class ResultsWodGroupMemberController : CorpoBaseController
    {
        private IResultsWodGroupMemberService _resultsWodGroupMemberService;

        public ResultsWodGroupMemberController(IResultsWodGroupMemberService resultsWodGroupMemberService)
        {
            _resultsWodGroupMemberService = resultsWodGroupMemberService;
        }


        [HttpPost]
        public async Task<ActionResult> Add(List<ResultsWodGroupMemberDto> results)
        {
            var response = await _resultsWodGroupMemberService.Add(results);
            return this.ToActionResult(response);
        }

        [HttpGet("by-wod-id")]
        public async Task<ActionResult> GetByWodId(int wodId)
        {
            var response = await _resultsWodGroupMemberService.GetByWodId(wodId);
            return this.ToActionResult(response);
        }
    }
}
