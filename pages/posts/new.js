import PostForm from '../../components/forms/PostForm'
import {useCreatePost} from '../../apollo/actions'
import {useRouter} from 'next/router'
import withApollo from '../../hoc/withApollo'
import withAuth from '../../hoc/withAuth'
import BaseLayout from '../../layouts/BaseLayout'
import {toast} from "react-toastify"

const PostNew = () => {
    const [createPost, {error}] = useCreatePost()
    const router = useRouter()

    const errorMessage = error => {
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Something went wrong...'
    }

    const handleCreatePost = async (data) => {
        await createPost({variables: data})
        await router.push('/posts')
        toast.success('Post has been created!', {autoClose: 3000})
    }

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Create New Post</h1>
                        <PostForm onSubmit={handleCreatePost}/>
                        {error && <div className="alert alert-danger">{errorMessage(error)}</div>}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(PostNew, ['admin']))
