const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const billingRoutes = require('./routes/billingRoutes')

// mongoose and passport config to load whenever app starts
// - load mongoose first because passport is using the User model
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

// create express app
const app = express()

//MIDDLEWARE (via app.use())

//parse incoming put, post, patch, whatever requests and assign to req.body
app.use(bodyParser.json())

// tell the app to use cookies using cookie-sessions
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, //30 days
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
authRoutes(app)
billingRoutes(app)

//ENVIRONMENT
const PORT = process.env.PORT || 5000
app.listen(PORT)
//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000
