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
    public class PurchaseController : ControllerBase
    {
        private IPurchaseService _purchaseService;

        public PurchaseController(IPurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
        }

        [HttpGet("getAll")]
        public ActionResult GetAll()
        {
            var response = _purchaseService.GetAll();
            var listPurchases = ((IEnumerable)response.Result).Cast<Purchase>().ToList();
            return Ok(listPurchases);
        }

        [HttpDelete("Delete")]
        public ActionResult Delete(int id)
        {
            var response = _purchaseService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpGet("GetDetailPurchase")]
        public ActionResult GetDetailPurchase(int id)
        {
            var response = _purchaseService.GetDetailPurchase(id);
            var listDetailPurchase = ((IEnumerable)response.Result).Cast<DetailPurchase>().ToList();
            return Ok(listDetailPurchase);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody] Purchase purchase)
        {
            var response = _purchaseService.Add(purchase);
            return this.ToActionResult(response);
        }
    }
}
