exports.postTypes = `
  type Post {
    _id: ID,
    title: String,
    content: String,
    startDate: String,
    user: User
  }

  input PostInput {
    title: String,
    content: String,
    startDate: String,
  }
`
exports.userTypes = `
  type User {
    _id: ID,
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
    role: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`
