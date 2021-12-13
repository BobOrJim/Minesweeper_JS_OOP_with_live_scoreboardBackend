using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Shared.Interfaces;
using Shared.Models;
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
        private readonly IDataAccess _dataAccess;

        public HighScoreController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public IEnumerable<HighScore> GetHighScoreList()
        {
            //string dbConn2 = configuration.GetValue<string>("MyMongoDatabase:databaseName");
            //var a = _dataAccess.ReadAllDocuments<BsonDocument>(databaseName, collectionName));
            return new List<HighScore>();
        }

        [HttpPost]
        public void PostHighScore(HighScore highScore)
        {
        }


    }
}
