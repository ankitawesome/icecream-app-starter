// Important Imports 
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')
const passportLocal = require('passport-local')
// Creation of app instance
const app = express()
//Defined the port that we will use locally as well as while serving up
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})
// Listening the port on the port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})