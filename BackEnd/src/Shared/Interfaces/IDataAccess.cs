using MongoDB.Bson;
using System;
using System.Collections.Generic;

namespace Shared.Interfaces
{
    public interface IDataAccess
    {
        void CreateCollection(string database, string collection);
        void CreateDb(string database);
        void CreateDocument<T>(string database, string collection, T document);
        void DeleteCollection(string database, string collection);
        void DeleteDatabase(string database);
        void DeleteRecord<T>(string database, string collection, Guid id);
        List<BsonDocument> ReadAllCollections(string database);
        List<BsonDocument> ReadAllDbs();
        List<T> ReadAllDocuments<T>(string database, string collection);
        void UpdateCollection();
        void UpdateDatabase();
        void UpsertRecord<T>(string database, string collection, Guid id, T document);
    }
}