using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.V01
{


    [Route("api/[controller]")]
    [ApiController]
    public class HighScoreController : ControllerBase
    {


        [HttpGet]
        public IEnumerable<HighScore> GetHighScoreList()
        {
            return new List<HighScore>();
        }

        [HttpPost]
        public void PostHighScore(HighScore highScore)
        {
        }


    }
}
