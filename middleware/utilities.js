const session = require("express-session")

// CSRF TOKEN GENERATOR
module.exports.csrf = function csrf (req, res, next) {
    res.locals.token = req.csrfToken()
    next()
}

// AUTHENTICATION
module.exports.authenticated = function authenticated (req, res, next) {
    res.locals.isAuthenticated = req.session.isAuthenticated

    if(req.session.isAuthenticated) {
        res.locals.user = req.locals.user
    }
    next()
}

// MODIFY AUTHENTICATION
module.exports.requireAuthentication = function requireAuthentication (req, res, next) {

    if (req.session.isAuthenticated) {
        next()
    } else {
        res.redirect('/login')
    }
}

// LOGIN IN USER
module.exports.auth = function auth (req, res, next) {
    const isAuth = username === 'John' || username === 'Brian'

    if(isAuth) {
        session.isAuthenticated = isAuth
        session.user = { username: username }
    }
    return isAuth
}

// LOGOUT USER
module.exports.logOut = function logOut (session) {
    session.isAuthenticated = false
    delete session.user
}