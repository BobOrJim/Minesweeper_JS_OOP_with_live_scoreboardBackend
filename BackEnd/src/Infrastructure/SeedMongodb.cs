using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Shared.Interfaces;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure
{
    public static class SeedMongodb
    {
        static Guid BeritGuid = Guid.Parse("{1198F549-E790-4E9F-AA16-18C2292A2EE9}");
        static Guid MrPinkGuid = Guid.Parse("{1298F549-E790-4E9F-AA16-18C2292A2EE9}");
        static Guid JackGuid = Guid.Parse("{1398F549-E790-4E9F-AA16-18C2292A2EE9}");
        static Guid BobGuid = Guid.Parse("{1498F549-E790-4E9F-AA16-18C2292A2EE9}");

        private static List<HighScore> highScoresToSeed = new List<HighScore>
        {
            new HighScore{ Id = BeritGuid, Name = "Berit", Time = 155.5f },
            new HighScore{ Id = MrPinkGuid, Name = "MrPink", Time = 85.5f },
            new HighScore{ Id = JackGuid, Name = "Jack", Time = 77.3f },
            new HighScore{ Id = BobGuid, Name = "Bob", Time = 76.1f },
        };

        static public void Seed(IDataAccess dataAccess)
        {
            string databaseName = "MineSweeperDatabase";
            string collectionName = "MineSweeperCollection";
            List<HighScore> allHighScores = new();

            foreach (BsonDocument document in dataAccess.ReadAllDocuments<BsonDocument>(databaseName, collectionName))
            {
                allHighScores.Add(BsonSerializer.Deserialize<HighScore>(document));
            }

            foreach (HighScore highScore in highScoresToSeed)
            {
                if (!allHighScores.Any(guid => guid.Id == highScore.Id))
                {
                    dataAccess.CreateDocument(databaseName, collectionName, highScore);
                }
            }
        }
    }
}
