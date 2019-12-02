const User = require('./models/users');


function auth(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Auth header not set");
        res.setHeader("WWW-Authenticate", "Basic");
        err.status = 401;
        return next(err);
    }
    let auth = new Buffer.from(authHeader.split(' ')[1], "base64")
        .toString().split(":");

    User.findOne({ username: auth[0] })
        .then((user) => {
            if (user === null) {
                let err = new Error("Username does not exits!");
            err.status = 403;
                return next(err);
            } else if (user.password !== auth[1]) {
                let err = new Error("Password does not match!");
                err.status = 403;
            return next(err);
        }
        req.user = user;
        next();
        }).catch(next);
}


module.exports = auth;