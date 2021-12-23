const mongoose = require('mongoose')
const config = require('../config')
const initialDb = require('./InitialDb')

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, async () => {
    console.log('Starting populating DB...')
    await initialDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated...')
})
