using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/weekly-template")]
    [ApiController]
    public class WeeklyTemplateController : ControllerBase
    {
        private IWeeklyTemplateService _weeklyTemplateService;

        public WeeklyTemplateController(IWeeklyTemplateService weeklyTemplateService)
        {
            _weeklyTemplateService = weeklyTemplateService;
        }

        [HttpPost]
        public async Task<ActionResult> Add(WeeklyTemplate weeklyTemplate)
        {
            var response = await _weeklyTemplateService.Add(weeklyTemplate);
            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var response = await _weeklyTemplateService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
           var response = await _weeklyTemplateService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<ActionResult> Update(WeeklyTemplate weeklyTemplate, int id)
        {
            var response = await _weeklyTemplateService.Update(weeklyTemplate, id);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _weeklyTemplateService.Delete(id);
            return this.ToActionResult(response);
        }
    }
}
