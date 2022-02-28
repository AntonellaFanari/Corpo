using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/weekly-goal")]
    [ApiController]
    public class WeeklyGoalController : ControllerBase
    {
       private IWeeklyGoalService  _weeklyGoalService;

        public WeeklyGoalController(IWeeklyGoalService weeklyGoalService)
        {
            _weeklyGoalService = weeklyGoalService;
        }


        [HttpPost]
        public async Task<ActionResult> Add([FromBody] WeeklyGoal weeklyGoal)
        {
            var response = await _weeklyGoalService.Add(weeklyGoal);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WeeklyGoal>> GetById(int id)
        {
            var response = await _weeklyGoalService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] WeeklyGoal weeklyGoal)
        {
            var response = await _weeklyGoalService.Update(weeklyGoal);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<WeeklyGoal>>> GetAll()
        {
            var response = await _weeklyGoalService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _weeklyGoalService.Delete(id);
            return this.ToActionResult(response);
        }
    }
}
