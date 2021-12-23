const config = require('../config')
const session = require('express-session')
const passport = require('passport')

exports.init = (server, db) => {
    require('./passport').init(passport)

    const sess = {
        name: 'blog-session',
        secret: config.SESSION_SECRET,
        cookie: {maxAge: 2 * 60 * 60 * 1000},
        resave: false,
        saveUninitialized: false,
        store: db.initSessionStore()
    }

    if (process.env.NODE_ENV === 'production') {
        server.set('trust proxy', 1)
        sess.cookie.secure = true
        sess.cookie.httpOnly = true
        sess.cookie.sameSite = true
        sess.cookie.domain = process.env.DOMAIN
    }

    server.use(session(sess))
    server.use(passport.initialize())
    server.use(passport.session())
}
