using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Shared.Models
{
    public class HighScore
    {
        [BsonId] // _Id
        public Guid Id { get; set; }
        public string Name { get; set; } //Player name
        public float Time { get; set; } //Player time (seconds) to compleate level
    }
}
