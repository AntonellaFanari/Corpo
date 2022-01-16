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
    public class PromotionController : ControllerBase
    {
        private IPromotionService _promotionService;

        public PromotionController(IPromotionService promotionService)
        {
            _promotionService = promotionService;
        }

        [HttpGet("getAll")]
        public ActionResult GetAll()
        {
            var response = _promotionService.GetAll();
            var listPromotions = ((IEnumerable)response.Result).Cast<Promotion>().ToList();
            return Ok(listPromotions);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _promotionService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody]Promotion promotion)
        {
            var response = _promotionService.Add(promotion);
            return this.ToActionResult(response);
        }

        [HttpGet("getById")]
        public ActionResult GetById(int id)
        {
            var response = _promotionService.GetById(id);
            return Ok(response);
        }

        [HttpPut("update")]
        public ActionResult Update(int id, [FromBody] Promotion promotion)
        {
            var response = _promotionService.Update(id, promotion);
            return this.ToActionResult(response);
        }
    }
}
