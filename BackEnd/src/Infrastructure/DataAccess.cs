using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Collections.Generic;
//using Shared.Model;
//using Shared.Interfaces;


namespace Infrastructure
{
    public class DataAccess : IDataAccess
    {

        private IMongoDatabase _db;
        private MongoClient _mongoClient;

        public DataAccess()
        {
            _mongoClient = new MongoClient();
        }


        //CRUD om mongo Db
        public void CreateDb(string database)
        {
            _db = _mongoClient.GetDatabase(database);
            CreateDocument(database, "Dummy", new { Dummy = "Dummy" });
        }
        public List<BsonDocument> ReadAllDbs()
        {
            return _mongoClient.ListDatabases().ToList();
        }
        public void UpdateDatabase()
        {
            //Obsolete
        }
        public void DeleteDatabase(string database)
        {
            _mongoClient.DropDatabase(database);
        }


        //CRUD on mongo collections
        public void CreateCollection(string database, string collection)
        {
            _db = _mongoClient.GetDatabase(database);
            _db.CreateCollection(collection);
        }
        public List<BsonDocument> ReadAllCollections(string database)
        {
            _db = _mongoClient.GetDatabase(database);
            return _db.ListCollections().ToList();
        }
        public void UpdateCollection()
        {
            //Obsolete
        }
        public void DeleteCollection(string database, string collection)
        {
            _db = _mongoClient.GetDatabase(database);
            _db.DropCollection(collection);
        }


        //CRUD on mongo documents
        public void CreateDocument<T>(string database, string collection, T document) // insert one document to collection in database
        {
            _db = _mongoClient.GetDatabase(database);
            var thisCollection = _db.GetCollection<T>(collection);
            thisCollection.InsertOne(document);
        }
        public List<T> ReadAllDocuments<T>(string database, string collection)  // load all documents in collection
        {
            _db = _mongoClient.GetDatabase(database);
            var thisCollection = _db.GetCollection<T>(collection);
            return thisCollection.Find(new BsonDocument()).ToList();
        }
        public void UpsertRecord<T>(string database, string collection, Guid id, T document) // Insert Or Update
        {
            _db = _mongoClient.GetDatabase(database);
            var newCollection = _db.GetCollection<T>(collection);
            newCollection.ReplaceOne(new BsonDocument("_id", new BsonBinaryData(id, GuidRepresentation.Standard)), document, new ReplaceOptions { IsUpsert = true });
        }
        public void DeleteRecord<T>(string database, string collection, Guid id)  // delete One document from collection
        {
            _db = _mongoClient.GetDatabase(database);
            var newCollection = _db.GetCollection<T>(collection);
            var filter = Builders<T>.Filter.Eq("Id", id);
            newCollection.DeleteOne(filter);
        }

    }
}


