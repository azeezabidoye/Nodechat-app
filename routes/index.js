const utils = require('../middleware/utilities')

// MODULES EXPORT
module.exports.index = index
module.exports.login = login
module.exports.loginProcess = loginProcess
module.exports.chat = chat
module.exports.logOut = logOut

// HOMEPAGE
function index (req, res) {
    res.cookie('IndexCookie', 'This was rendered from index')
    res.render('index.ejs', { title: 'Index' })
}

// LOGIN
function login (req, res) {
    console.log(req.body)
    res.render('index.ejs', {title: "Login", username: req.body.username,password: req.body.password});    
}

// LOGIN-IN
function loginProcess (req, res) {
    let username = req.body.username
    let password = req.body.password
    let session = req.session

    let isAuth = utils.auth (username, password, session)

    if (isAuth) {
        res.redirect('/chat')
    } else {
        res.redirect('/login')
    }
    
}

// CHAT
function chat (req, res) {
    res.render('chat.ejs', { title: 'Chat' })
}

// LOGOUT 
function logOut (req, res) {
    utils.logOut(req.session)
    res.redirect('/')
}