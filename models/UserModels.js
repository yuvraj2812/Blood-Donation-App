const mongo = require('./mongo')
const {ObjectId} = require('mongodb')

var User = function()
{
    this.uploadUserPic = (id,filename,callback)=>
    {
        mongo((status,db,client)=>
        {
            if(status)
            {
                var where = {_id:ObjectId(id)}
                var data = {$set:{pic:filename}}
               db.collection('user').updateOne(where,data,(err)=>
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

    this.saveUser = (data,callback)=>
    {
        mongo((status,db,client)=>
        {
            if(status)
            {
                db.collection('user').insertOne(data,(err)=>
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

    this.loginUser = (data,callback)=>
    {
        // console.log(data)
        mongo((status,db,client)=>
        {
            if(status)
            {
                db.collection('user').findOne(data,{
                    projection : {password:0}
                },(err,user)=>
                {
                    if (err || user==undefined)
                        callback(false)
                    else
                        callback(user)    
                })
            }else
            {
                callback(false)
            }
        })
    }


    this.listOtherUser = (id,callback)=>
    {       
        mongo((status,db,client)=>
        {
            if(status)
            {
                var where = {_id:{$ne:ObjectId(id)}}
                db.collection('user').find(where,{
                    projection : {password:0}
                }).toArray((err,data)=>
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

module.exports = new User()

