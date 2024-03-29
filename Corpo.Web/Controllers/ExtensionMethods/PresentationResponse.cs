﻿using Corpo.Domain.Models;
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
            if (domainResponse.Success)
                return new OkResult();
            else
                return new BadRequestResult();
        }

        public static ActionResult ToActionResult(this ControllerBase controller, DomainResponse domainResponse)
        {

            if (domainResponse.Success)
                return controller.Ok(new
                {
                    Result = domainResponse.Result
                });
            else
                return controller.BadRequest(new
                {
                    Errores = domainResponse.Errors,
                    Mensaje = ""
                });
        }
    }
}
