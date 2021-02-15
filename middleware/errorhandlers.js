exports.notFound = function notFound (err, req, res, next) {
    res.send(404, 'You seem lost Omo-iya!')
    next()
}

exports.error = function error (err, req, res, next) {
    console.log(err)
    res.status(500).send('Something broke. What did you do?')
}