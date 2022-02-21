using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
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
    public class SaleController : CorpoBaseController
    {
        private ISaleService _saleService;

        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        [HttpGet("getAll")]
        public ActionResult<Sale> GetAll(int id)
        {
            var response = _saleService.GetAll(id);
            var listSales = ((IEnumerable)response.Result).Cast<Sale>().ToList();
            return Ok(listSales);
        }

        [HttpGet("getDetailsSale")]
        public ActionResult<DetailsSale> GetDetailsSale(int idSale)
        {
            var response = _saleService.GetDetailsSale(idSale);
            var listDetailsSales = ((IEnumerable)response.Result).Cast<DetailsSale>().ToList();
            return Ok(listDetailsSales);
        }

        [HttpPost("add")]
        public ActionResult Add(SaleDto newSale)
        {
            var user = GetUser();
            var response = _saleService.Add(user, newSale);
            return this.ToActionResult(response);
        }

        [HttpPost("cancel")]
        public async Task<ActionResult> Cancel(int id, CancelSale cancelSale)
        {
            var user = GetUser();
            var response = await _saleService.Cancel(user.Id, id, cancelSale);
            return this.ToActionResult(response);
        }


        [HttpGet("getCancelSale")]
        public ActionResult<DetailsSale> GetCancelSale(int idSale)
        {
            var response = _saleService.GetCancelSale(idSale);
            return Ok(response);
        }

        [HttpGet("getSaleById")]
        public ActionResult<Sale> GetSaleById(int id)
        {
            var response = _saleService.GetSaleById(id);
            return Ok(response);
        }
    }
}
