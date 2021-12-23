import PostCard from '../../components/posts/PostCard'
import Link from 'next/link'
import {useGetPosts} from '../../apollo/actions'
import withApollo from '../../hoc/withApollo'
import {getDataFromTree} from '@apollo/react-ssr'
import BaseLayout from '../../layouts/BaseLayout'

const Posts = () => {
    const {data} = useGetPosts()
    const posts = data && data.posts || []

    return (
        <BaseLayout>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Posts</h1>
                    </div>
                </div>
            </section>
            <section className="pb-5">
                <div className="row">
                    {posts.map(post =>
                        <div key={post._id} className="col-md-4">
                            <Link
                                href='/posts/[id]'
                                as={`/posts/${post._id}`}>
                                <a className="card-link mb-2">
                                    <PostCard post={post}/>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </BaseLayout>
    )
}

export default withApollo(Posts, {getDataFromTree})
