import PostForm from '../../../components/forms/PostForm'
import withApollo from '../../../hoc/withApollo'
import withAuth from '../../../hoc/withAuth'
import BaseLayout from '../../../layouts/BaseLayout'
import {useRouter} from 'next/router'
import {useGetPost, useUpdatePost} from '../../../apollo/actions'
import {toast} from 'react-toastify'

const PostEdit = () => {
    const router = useRouter()
    const [updatePost, {error}] = useUpdatePost()
    const {id} = router.query
    const {data} = useGetPost({variables: {id}})

    const errorMessage = error => {
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Something went wrong...'
    }

    const handlePostUpdate = async (data) => {
        await updatePost({variables: {id, ...data}})
        await router.push('/posts')
        toast.success('Post has been updated!', {autoClose: 3000})
    }

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Edit Post</h1>
                        {data &&
                            <PostForm
                                initialData={data.post}
                                onSubmit={handlePostUpdate}/>
                        }
                        {error && <div className="alert alert-danger">{errorMessage(error)}</div>}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(PostEdit, ['admin']))
