﻿using Corpo.Domain.Contracts.Services;
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
    [Route("api/monthly-goal")]
    [ApiController]
    public class MonthlyGoalController : ControllerBase
    {
        private IMonthlyGoalService _monthlyGoalService;

        public MonthlyGoalController(IMonthlyGoalService monthlyGoalService)
        {
            _monthlyGoalService = monthlyGoalService;
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] MonthlyGoal monthlyGoal)
        {
            var response = await _monthlyGoalService.Add(monthlyGoal);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MonthlyGoal>> GetById(int id)
        {
            var response = await _monthlyGoalService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] MonthlyGoal monthlyGoal)
        {
            var response = await _monthlyGoalService.Update(monthlyGoal);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<MonthlyGoal>>> GetAll()
        {
            var response = await _monthlyGoalService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _monthlyGoalService.Delete(id);
            return this.ToActionResult(response);
        }
    }
}
