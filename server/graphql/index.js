const mongoose = require('mongoose')
const {ApolloServer, gql} = require('apollo-server-express')

const {
    postQueries,
    postMutations,
    userMutations,
    userQueries
} = require('./resolvers')
const {postTypes, userTypes} = require('./types')
const {buildAuthContext} = require('./context')

const Post = require('./models/Post')
const User = require('./models/User')

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${postTypes}
    ${userTypes}
  
    type Query {
      post(id: ID): Post
      posts: [Post]
      userPosts: [Post]
      user: User
    }
  
    type Mutation {
      createPost(input: PostInput): Post
      updatePost(id: ID, input: PostInput): Post
      deletePost(id: ID): ID
      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }`)

    const resolvers = {
        Query: {
            ...postQueries,
            ...userQueries,
        },
        Mutation: {
            ...postMutations,
            ...userMutations,
        }
    }

    const apolloServer = new ApolloServer({
        typeDefs, resolvers,
        context: ({req}) => ({
            ...buildAuthContext(req),
            models: {
                Post: new Post(mongoose.model('Post'), req.user),
                User: new User(mongoose.model('User')),
            }
        })
    })

    return apolloServer
}
