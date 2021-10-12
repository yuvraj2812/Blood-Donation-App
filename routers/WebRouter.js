const express = require('express')

const router = express.Router()

const userModel = require('../models/UserModels')

router.use("/saveuser",(request,response)=>
{
    //console.log(request.body)
    userModel.saveUser(request.body,(result)=>
    {
        //console.log(result)
        response.redirect('/web/register?reg='+result)
    })
})



router.all("/login",(request,response)=>
{
    if(request.method=='GET')
    {
        var msg = '';
        var err = request.query.err
        if(err!=undefined)
            msg = "Invalid ID or Password !"
        response.render('login',{
            msg:msg
        })
    }else
    {
        userModel.loginUser(request.body,(result)=>
        {
            if(result)
            {
                request.session.loginuser = result
                response.redirect("/user/home")
            }else
                response.redirect("/web/login?err=1")
        })
    }
})



router.use("/register",(request,response)=>
{
    var msg = '';
    var reg = request.query.reg
    if (reg!=undefined)
    {
        if(reg=='true')
            msg = "Registeration Successfully Done !"
        else
            msg = "Registeration Failed !"    
    }
    response.render('register',{
            msg:msg
    })
})

router.use("/home",(request,response)=>
{
    response.render('index')
})

router.use("/contact",(request,response)=>
{
    response.render('contact')
})



module.exports = router