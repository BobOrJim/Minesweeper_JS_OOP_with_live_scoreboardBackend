using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Shared.Interfaces;
using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers.V01
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighScoreController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        private readonly IConfiguration _iConfig;
        private readonly string databaseName;
        private readonly string collectionName;

        public HighScoreController(IDataAccess dataAccess, IConfiguration iConfig)
        {
            _dataAccess = dataAccess;
            _iConfig = iConfig;
            databaseName = _iConfig.GetValue<string>("MyMongoDatabase:databaseName");
            collectionName = _iConfig.GetValue<string>("MyMongoDatabase:collectionName");
        }

        [HttpGet]
        public async Task<IActionResult> GetHighScoreList()
        {
            List<HighScore> allHighScores = new();
            foreach (BsonDocument document in _dataAccess.ReadAllDocuments<BsonDocument>(databaseName, collectionName))
            {
                allHighScores.Add(BsonSerializer.Deserialize<HighScore>(document));
            }
            return Ok(allHighScores);
        }

        [HttpPost]
        public async Task<IActionResult> PostHighScore([FromBody] HighScore highScore) //Note, GUID will be generated, and does not need to included of http body.
        {
            _dataAccess.CreateDocument(databaseName, collectionName, highScore);
            return Ok();
        }
    }
}

