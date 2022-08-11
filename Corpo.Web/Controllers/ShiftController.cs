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
    public class ShiftController : ControllerBase
    {
        private IShiftService _shiftService;

        public ShiftController(IShiftService shiftService)
        {
            _shiftService = shiftService;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> GetAll(DateTime from, DateTime to, int classId)
        {
            var response = await _shiftService.GetAll(from, to, classId);
            return this.ToActionResult(response);
        }

        [HttpPost("add")]
        public ActionResult Add(List<Shift> shifts)
        {
            var response = _shiftService.Add(shifts);
            return this.ToActionResult(response);
        }

        [HttpPut("update")]
        async public Task<ActionResult> Update(List<Shift> shifts)
        {
            var response = await _shiftService.Update(shifts);
            return this.ToActionResult(response);
        }

        [HttpPost("delete")]
        public ActionResult Delete(List<int> idShifts)
        {
            var response = _shiftService.Delete(idShifts);
            return this.ToActionResult(response);
        }

        [HttpGet("getById")]
        async public Task<ActionResult<Shift>> GetById(int id)
        {
            var response = await _shiftService.GetById(id);
            return Ok(response);
        }

    }
}
