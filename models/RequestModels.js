const mongo = require('./mongo')
const {ObjectId} = require('mongodb')

var Request = function()
{
    this.saveRequest = (data,callback)=>
    {
        mongo((status,db,client)=>
        {
            if(status)
            {
                db.collection('request').insertOne(data,(err)=>
                {
                    client.close()
                    if(err){
                        callback(false)
                    }else
                    {
                        callback(true)
                    }
                });
            }else
            {
                callback(false)
            }
        })
    }  

    this.myRequest = (id,callback)=>
    {       
        mongo((status,db,client)=>
        {
            if(status)
            {
                var where = {sender:id}
                db.collection('request').find(where).toArray((err,data)=>
                {
                    if(err)
                        callback([])
                    else
                        callback(data)    
                });
            }else
            {
                callback([])
            }
        })
    }

    this.otherRequest = (id,callback)=>
    {       
        mongo((status,db,client)=>
        {
            if(status)
            {
                var where = {sender:{$ne:id}}
                db.collection('request').find(where).toArray((err,data)=>
                {
                    if(err)
                        callback([])
                    else
                        callback(data)    
                });
            }else
            {
                callback([])
            }
        })
    }
}

module.exports = new Request()

