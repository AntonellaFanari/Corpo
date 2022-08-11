using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Corpo.Web.Controllers
{
    [Route("api/test-template")]
    [ApiController]
    public class TestTemplateController : ControllerBase
    {
        private ITestTemplateService _testTemplateService;

        public TestTemplateController(ITestTemplateService testTemplateService)
        {
            _testTemplateService = testTemplateService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TestTemplate>>> GetAll()
        {
            var response = await _testTemplateService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody]TestTemplate test)
        {
            var response = await _testTemplateService.Add(test);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _testTemplateService.Delete(id);
            return this.ToActionResult(response);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TestTemplate>> GetById(int id)
        {
            var response = await _testTemplateService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpGet("detail-by-id")]
        public async Task<ActionResult<TestTemplate>> GetDetailById(int id)
        {
            var response = await _testTemplateService.GetDetailById(id);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody]TestTemplate test)
        {
            var response = await _testTemplateService.Update(test);
            return this.ToActionResult(response);
        }


        [HttpGet("all-exercises-fms")]
        public async Task<ActionResult> GetAllExercisesFMS()
        {
            var response = await _testTemplateService.GetAllExercisesFMS();
            return this.ToActionResult(response);
        }
    }
}
