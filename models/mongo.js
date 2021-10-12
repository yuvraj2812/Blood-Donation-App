const mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017"

function getConnection(callback)
{
    mongoClient.connect(url,(err,client)=>
    {
        if (err)
            callback(false)
        else
        {
            var db = client.db('blooddonor')
            callback(true,db,client)
        }
    });
}

module.exports = getConnection;