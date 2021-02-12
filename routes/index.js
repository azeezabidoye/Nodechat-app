// MODULES EXPORT
module.exports.index = index
module.exports.login = login
module.exports.loginProcess = loginProcess
module.exports.chat = chat

function index (req, res) {
    res.cookie('IndexCookie', 'This was rendered from index')
    res.render('index.ejs', { title: 'Index' })
}


function login (req, res) {
    res.render('login.ejs', { title: 'Login' })
}


function loginProcess (req, res) {
    res.redirect('/')
}

function chat (req, res) {
    res.render('chat.ejs', { title: 'Chat' })
}