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

//Database Connection
const url = 'mongodb://localhost/pizza-app';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('Database Connected')
}).catch(err =>{
    console.log('Something went wrong...')
})
//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})


//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24 //24 hours
    }
    // cookie:{
    //     maxAge:1000*15 //15 seconds
    // }
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//Global Middleware
app.use((req, res, next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine and configuration of it

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

// A simple route to show home page
require('./routes/web')(app)


// Listening the port on the port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})