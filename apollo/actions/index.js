import {useQuery, useMutation, useLazyQuery} from '@apollo/react-hooks'
import {
    GET_POSTS,
    GET_POST,
    GET_USER_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    SIGN_IN,
    SIGN_OUT,
    GET_USER
} from '../queries'

export const useGetPosts = () => useQuery(GET_POSTS)
export const useGetPost = (options) => useQuery(GET_POST, options)
export const useGetUserPosts = () => useQuery(GET_USER_POSTS)
export const useUpdatePost = () => useMutation(UPDATE_POST)

export const useDeletePost = () => useMutation(DELETE_POST, {
    update(cache, {data: {deletePost}}) {
        const {userPosts} = cache.readQuery({query: GET_USER_POSTS})
        const newUserPosts = userPosts.filter(p => p._id !== deletePost)
        cache.writeQuery({
            query: GET_USER_POSTS,
            data: {userPosts: newUserPosts}
        })
        const {posts} = cache.readQuery({query: GET_POSTS})
        const newPosts = posts.filter(p => p._id !== deletePost)
        cache.writeQuery({
            query: GET_POSTS,
            data: {posts: newPosts}
        })
    }
})

export const useCreatePost = () => useMutation(CREATE_POST, {
    update(cache, {data: {createPost}}) {
        const {userPosts} = cache.readQuery({query: GET_USER_POSTS})
        cache.writeQuery({
            query: GET_USER_POSTS,
            data: {userPosts: [...userPosts, createPost]}
        })
        const {posts} = cache.readQuery({query: GET_POSTS})
        cache.writeQuery({
            query: GET_POSTS,
            data: {posts: [...posts, createPost]}
        })
    }
})

export const useSignIn = () => useMutation(SIGN_IN, {
    update(cache, {data: {signIn: signedInUser}}) {
        cache.writeQuery({
            query: GET_USER,
            data: {user: signedInUser}
        })
    }
})

export const useSignOut = () => useMutation(SIGN_OUT)
export const useLazyGetUser = () => useLazyQuery(GET_USER)
export const useGetUser = () => useQuery(GET_USER)
