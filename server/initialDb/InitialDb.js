const {posts, users} = require('./data')

const Post = require('../database/models/post')
const User = require('../database/models/user')

class InitialDb {
    async clean() {
        await User.deleteMany({})
        await Post.deleteMany({})
    }

    async addData() {
        await User.create(users)
        await Post.create(posts)
    }

    async populate() {
        await this.clean()
        await this.addData()
    }
}

module.exports = new InitialDb()
