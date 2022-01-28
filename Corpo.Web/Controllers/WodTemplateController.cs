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
    [Route("api/[controller]")]
    [ApiController]
    public class WodTemplateController : ControllerBase
    {
        private IWodTemplateService _wodTemplateService;

        public WodTemplateController(IWodTemplateService wodTemplateService)
        {
            _wodTemplateService = wodTemplateService;
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] WodTemplate wodTemplate)
        {
            var response = await _wodTemplateService.Add(wodTemplate);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<WodTemplate>>> GetAll()
        {
            var response = await _wodTemplateService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] WodTemplate wodTemplate)
        {
            var response = await _wodTemplateService.Update(wodTemplate);
            return this.ToActionResult(response);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var response = _wodTemplateService.Delete(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WodTemplate>> GetById(int id)
        {
            var response = await _wodTemplateService.GetById(id);
            return this.ToActionResult(response);
        }
    }
}
