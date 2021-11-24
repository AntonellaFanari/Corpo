using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {
        private IPlanService _planService;

        public PlanController(IPlanService planService)
        {
            _planService = planService;
        }

        [HttpGet("getPlans")]
        public ActionResult GetPlans()
        {
            var response = _planService.GetPlans();
            var list = ((IEnumerable)response.Result).Cast<Plan>().ToList();
            return Ok(list);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody]Plan newPlan)
        {
            var response = _planService.Add(newPlan);
            return this.ToActionResult(response);
        }

        [HttpGet("getById")]
        public ActionResult GetById(int id)
        {
            var plan = _planService.GetById(id);
            return Ok(plan);
        }

        [HttpPut("update")]
        public ActionResult Update(int id, [FromBody]Plan planEdit)
        {
            var response = _planService.Update(id, planEdit);
            return this.ToActionResult(response);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _planService.Delete(id);
            return this.ToActionResult(response);
        }

    }
}
