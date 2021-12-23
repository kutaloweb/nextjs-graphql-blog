const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {type: String, required: true, maxlength: 128},
    content: {type: String, required: true},
    startDate: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', postSchema)
