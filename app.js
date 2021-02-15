// BASIC SETUP
const express = require('express')
const redis = require('redis')
const routes = require('./routes')
const partials = require('express-partials')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const bodyParser = require('body-parser')
const csrf = require('csurf')
const utils = require('./middleware/utilities')
const errorhandlers = require('./middleware/errorhandlers')
const log = require('./middleware/log')

// PORT SETUP
const PORT = process.env.PORT || 3000

// REDIS CLIENT
const redisClient = redis.createClient({
    host: 'localhost', 
    port: 6379
})


// INIT EXPRESS FUNCTION
const app = express()

// LAYOUT AND VIEWS
app.set('view options', { defaultLayout: 'Layout' })
app.set('view engine', 'ejs')

// UTILS
app.use(partials())
app.use(log.logger)
app.use(express.static(__dirname + '/static'))
app.use(cookieParser('secret'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore ({ client: redisClient })
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(csrf())
app.use(utils.csrf)
app.use(utils.authenticated)

// ROUTES
app.get('/', routes.index)
app.get('/login', routes.login)
app.post('/login', routes.loginProcess)
app.get('/chat', routes.chat)
app.get('/logout', routes.logOut)

app.use(errorhandlers.notFound)
app.use(errorhandlers.error)


app.get('/error', function (req, res, next) {
    next(new Error('A contrived error'))
})



app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`)
})