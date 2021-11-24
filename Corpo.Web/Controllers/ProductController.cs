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
    public class ProductController : ControllerBase
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet("getAll")]
        public ActionResult<Product> GetAll()
        {
            var response = _productService.GetAll();
            var listProduts = ((IEnumerable)response.Result).Cast<Product>().ToList();
            return Ok(listProduts);
        }

        [HttpGet("getById")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _productService.GetById(id);
            return Ok(product);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody]Product product)
        {
            var response = _productService.Add(product);
            return this.ToActionResult(response);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _productService.Delete(id);
            return this.ToActionResult(response);
        }

        [HttpPut("update")]
        public ActionResult Update(int id, Product product)
        {
            var response = _productService.Update(id, product);
            return this.ToActionResult(response);
        }
    }
}
