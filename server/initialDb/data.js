const mongoose = require('mongoose')

const user1Id = mongoose.Types.ObjectId()
const user2Id = mongoose.Types.ObjectId()

const data = {
    users: [
        {
            _id: user1Id,
            email: "user1@gmail.com",
            name: "User 1",
            username: "user1",
            password: "123123",
            role: "admin"
        },
        {
            _id: user2Id,
            email: "user2@gmail.com",
            name: "User 2",
            username: "user2",
            password: "123123",
            role: "guest"
        }
    ],
    posts: [
        {
            title: 'Title 1',
            content: 'Content 1 ...',
            startDate: '01/01/2022',
            user: user1Id
        },
        {
            title: 'Title 2',
            content: 'Content 2 ...',
            startDate: '01/01/2022',
            user: user2Id
        }
    ]
}

module.exports = data
