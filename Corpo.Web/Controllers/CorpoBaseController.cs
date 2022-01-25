using Corpo.Domain.Views;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    public class CorpoBaseController : ControllerBase
    {
        protected LoggedUser GetUser()
        {
            return JsonConvert.DeserializeObject<LoggedUser>(User.Claims.FirstOrDefault(x => x.Type == "user").Value);
        }
    }
}
