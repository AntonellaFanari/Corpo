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
    public class ClassController : ControllerBase
    {
        private IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody] Class newClass)
        {
            var response = _classService.Add(newClass);
            return this.ToActionResult(response);
        }

        [HttpGet("getAll")]
        public ActionResult<Class> GetAll()
        {
            var response = _classService.GetAll();
            var listClass = ((IEnumerable)response.Result).Cast<Class>().ToList();
            return Ok(listClass);
        }

        [HttpGet("getById")]
        public ActionResult GetById(int id)
        {
            var response = _classService.GetById(id);
            return Ok(response);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _classService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpPut("update")]
        public ActionResult Update(int id, [FromBody]Class classEdit)
        {
            var response = _classService.Update(id, classEdit);
            return this.ToActionResult(response);
        }
    }
}
