import {gql} from 'apollo-boost'

export const GET_POST = gql`
  query Post($id: ID) {
    post (id: $id) {
      _id
      title
      content
      user {
       username
      }
    }
  }
`

export const GET_POSTS = gql`
  query Posts {
    posts {
      _id
      title
      content
      startDate
      user {
       username
      }
    }
  }
`

export const GET_USER_POSTS = gql`
  query UserPosts {
    userPosts {
      _id
      title
      content
      startDate
      user {
       username
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String
    $content: String
    $startDate: String
  ) {
    createPost(input: {
      title: $title
      content: $content
      startDate: $startDate
    }) {
      _id,
      title,
      content,
      startDate
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID
    $title: String
    $content: String
    $startDate: String) {
    updatePost(id: $id, input: {
      title: $title
      content: $content
      startDate: $startDate
    }) {
      _id,
      title,
      content
      startDate
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: ID) {
    deletePost(id: $id)
  }
`

export const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $role: String!
  ) {
    signUp(input: {
      username: $username
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
      role: $role
    })
  }
`

export const SIGN_IN = gql`
  mutation SignIn(
    $email: String!
    $password: String!
  ) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      _id
      username
      role
    }
  }
`

export const SIGN_OUT = gql`
  mutation SignOut { 
    signOut 
  }
`

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`
