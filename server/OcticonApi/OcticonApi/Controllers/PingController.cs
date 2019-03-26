using Microsoft.AspNetCore.Mvc;
using System;

namespace OcticonApi.Controllers
{
    [Route("/")]
    public class PingController
    {
        [HttpGet]
        public String Hello()
        {
            return "Welcome to Octicon API";
        }
    }
}
