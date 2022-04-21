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
    [Route("api/training-system")]
    [ApiController]
    public class TrainingSystemController : ControllerBase
    {
        private ITrainingSystemService _trainingSystem;

        public TrainingSystemController(ITrainingSystemService trainingSystem)
        {
            _trainingSystem = trainingSystem;
        }

        [HttpGet]
        public async Task<ActionResult<TrainingSystem>> GetAll()
        {
            var response = await _trainingSystem.GetAll();
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] TrainingSystem trainingSystem)
        {
            var response = await _trainingSystem.Add(trainingSystem);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TrainingSystem>> GetById(int id)
        {
            var response = await _trainingSystem.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] TrainingSystem trainingSystem)
        {
            var response = await _trainingSystem.Update(id, trainingSystem);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _trainingSystem.Delete(id);
            return this.ToActionResult(response);
        }
    }
}
