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
    public class ModalityController : ControllerBase
    {
        private IModalityService _modalityService;

        public ModalityController(IModalityService modalityService)
        {
            _modalityService = modalityService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Modality>>> GetAll()
        {
            var response = await _modalityService.GetAll();
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _modalityService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Modality modality)
        {
            var response = await _modalityService.Add(modality);
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Modality>> GetById(int id)
        {
            var response = await _modalityService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Modality modality)
        {
            var response = await _modalityService.Update(id, modality);
            return this.ToActionResult(response);
        }

    }
}
