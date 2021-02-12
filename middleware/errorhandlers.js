exports.notFound = function notFound (err, req, res) {
    res.send(404, 'You seem lost Omo-iya!')
}

exports.error = function error (err, req, res, next) {
    console.log(err)
    res.send(500, 'Something broke. What did you do?')
}