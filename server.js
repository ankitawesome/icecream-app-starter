// Important Imports 
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')

// Creation of app instance
const app = express()
//Defined the port that we will use locally as well as while serving up
const port = process.env.PORT || 3000

//Assets
app.use(express.static('public'))

//set template engine and configuration of it

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

// A simple route to show home page
app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/cart', (req, res)=>{
    res.render('customers/cart')
})

app.get('/login', (req, res)=>{
    res.render('auth/login')
})

app.get('/register', (req, res)=>{
    res.render('auth/register')
})


// Listening the port on the port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})