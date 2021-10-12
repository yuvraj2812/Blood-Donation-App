const express = require('express')
const path = require('path')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const webrouter = require('./routers/WebRouter')
const userrouter = require('./routers/UserRoute')

const app = express()


app.set('view engine','ejs')
app.use(express.urlencoded())
app.use(express.static(path.resolve('public')))
app.use(cookieParser())
app.use(expressSession({secret:"universal indore"}))
app.use(fileUpload())

app.use("/web",webrouter)
app.use("/user",userrouter)

app.use("/",(request,response)=>
{
    response.redirect("/web/home")    
})

app.listen(8989,()=>
{
    console.log('http://localhost:8989')
})