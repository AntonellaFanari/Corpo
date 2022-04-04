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
    [Route("api/intensity")]
    [ApiController]
    public class IntensityController : ControllerBase
    {
        private IIntensityService _intensityService;

        public IntensityController(IIntensityService intensityService)
        {
            _intensityService = intensityService;
        }

        [HttpGet]
        public async Task<ActionResult<Intensity>> GetAll()
        {
            var response = await _intensityService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Intensity intensity)
        {
            var response = await _intensityService.Add(intensity);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Intensity>> GetById(int id)
        {
            var response = await _intensityService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] Intensity intensity)
        {
            var response = await _intensityService.Update(id, intensity);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _intensityService.Delete(id);
            return this.ToActionResult(response);
        }
    }
}
