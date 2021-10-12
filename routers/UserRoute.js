const express = require('express')
const path = require('path')

const router = express.Router()

const userModel = require('../models/UserModels')
const requestModel = require('../models/RequestModels')

router.post("/uploadpic",(request,response)=>
{      
   var mypic = request.files.mypic

   var ext = path.extname(mypic.name)
   var filename = new Date().getUTCMilliseconds()+ext
   console.log(filename)
   var filepath = path.join(__dirname,"../public/user/",filename)
   mypic.mv(filepath)

   userModel.uploadUserPic( request.session.loginuser._id,filename,(res)=>
   {
        response.redirect('/user/profile')
   })
   
})

router.get("/profile",(request,response)=>
{      
   response.render('user/profile')
})


router.post("/saverequest",(request,response)=>
{   
    var data = request.body
    data.sendername = request.session.loginuser.name
    data.sender = request.session.loginuser._id

    requestModel.saveRequest(data,(result)=>
    {
        response.redirect('/user/request')    
    });    
})

router.get("/request",(request,response)=>
{   
    var id = request.session.loginuser._id
    requestModel.myRequest(id,(req1)=>
    {
        requestModel.otherRequest(id,(req2)=>
        {
            response.render('user/request',{
                'myreq' : req1,
                'otherreq'  : req2
            })       
        });        
    });    
})

router.get("/home",(request,response)=>
{   
    var name = request.session.loginuser.name
    var id = request.session.loginuser._id

    var pic = request.session.loginuser.pic
    userModel.listOtherUser(id,(users)=>
    {
        //console.log(users)
        response.render('user/home',{
            name : name , users : users, pic : pic
        })
    })   
})

router.get("/logout",(request,response)=>
{
    request.session.destroy()
    response.redirect("/web/login")
})

module.exports = router

/*

Temp Data : Cookie(Browser) , Session(Server)

*/