using Corpo.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers.ExtensionMethods
{
    public static class PresentationResponse
    {
        public static ActionResult ToActionResult(this DomainResponse domainResponse)
        {
            if (domainResponse.Success == true)
                return new OkResult();
            else
                return new BadRequestResult();
        }

        public static ActionResult ToActionResult(this ControllerBase controller, DomainResponse domainResponse)
        {

            if (domainResponse.Success == true)
                return controller.Ok(domainResponse.Message);
            else
                return controller.BadRequest(new
                {
                    Errores = domainResponse.Errors,
                    Mensaje = ""
                });
        }
    }
}
