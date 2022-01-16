using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
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
    public class CreditController : ControllerBase
    {
        private ICreditService _creditService;

        public CreditController(ICreditService creditService)
        {
            _creditService = creditService;
        }

        //[HttpPost("add")]
        //public ActionResult Add([FromBody] FeeDto feeDto)
        //{
           
        //}
    }
}
