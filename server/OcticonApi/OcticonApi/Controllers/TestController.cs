using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OcticonApi.Logic.Test;
using System;

namespace OcticonApi.Controllers
{
    public class TestController : Controller
    {
        [HttpGet]
        [Route("/[controller]")]
        public Int32 SetDbMockData()
        {
            new AddMockDataToDb().Execute();
            return 200;
        }

        [HttpGet]
        [Route("/[controller]/session/set")]
        public Int32 TestSessionSet()
        {
            var UniqueToken = Guid.NewGuid().ToString();
            var id = 12223;
            
            HttpContext.Session.SetInt32("_UserId", id);

            return 200;
        }

        [HttpGet]
        [Route("/[controller]/session/get")]
        public Int32 TestSessionGet()
        {
            var userId = HttpContext.Session.GetInt32("_UserId");

            return userId.HasValue 
                ? userId.Value
                : 0;
        }
    }
}
