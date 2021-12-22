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
    public class OutflowController : ControllerBase
    {
        IOutflowService _outflowService;

        public OutflowController(IOutflowService outflowService)
        {
            _outflowService = outflowService;
        }

        [HttpGet("getAllOutflowType")]
        public ActionResult<List<OutflowType>> GetAllOutflowType()
        {
            var response = _outflowService.GetAllOutflowType();
            var listOutflowType = ((IEnumerable)response.Result).Cast<OutflowType>().ToList();
            return Ok(listOutflowType);
        }

        [HttpDelete("deleteOutflowType")]
        public ActionResult DeleteOutflowType(int id)
        {
            var response = _outflowService.DeleteOutflowType(id);
            return this.ToActionResult(response);
        }

        [HttpPost("addOutflowType")]
        public ActionResult AddOutflowType([FromBody] OutflowType outflowType)
        {
            var response = _outflowService.AddOutflowType(outflowType);
            return this.ToActionResult(response);
        }

        [HttpPut("updateOutflowType")]
        public ActionResult UpdateOutflowType([FromBody] OutflowType outflowType)
        {
            var response = _outflowService.UpdateOutflowType(outflowType);
            return this.ToActionResult(response);
        }

        [HttpGet("getOutflowTypeById")]
        public ActionResult<OutflowType> GetOutflowTypeById(int id)
        {
            var outflowType = _outflowService.GetOutflowTypeById(id);
            return Ok(outflowType);
        }

        [HttpPost("addOutflow")]
        public ActionResult AddOutflow([FromBody] Outflow outflow)
        {
            var response = _outflowService.AddOutflow(outflow);
            return this.ToActionResult(response);
        }

        [HttpGet("getAllOutflow")]
        public ActionResult<List<Outflow>> GetAllOutflow()
        {
            var response = _outflowService.GetAllOutflow();
            var listOutflow = ((IEnumerable)response.Result).Cast<Outflow>().ToList();
            return Ok(listOutflow);
        }


        [HttpGet("getOutflowById")]
        public ActionResult<Outflow> GetOutflowById(int id)
        {
            var outflow = _outflowService.GetOutflowById(id);
            return Ok(outflow);
        }

        [HttpDelete("deleteOutflow")]
        public ActionResult DeleteOutflow(int id)
        {
            var response = _outflowService.DeleteOutflow(id);
            return this.ToActionResult(response);
        }
    }
}
