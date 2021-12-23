import {useGetPost} from '../../../apollo/actions'
import withApollo from '../../../hoc/withApollo'
import {getDataFromTree} from '@apollo/react-ssr'
import BaseLayout from '../../../layouts/BaseLayout'

const PostDetail = ({query}) => {
    const {data} = useGetPost({variables: {id: query.id}});
    const post = data && data.post || {};

    return (
        <BaseLayout>
            <div className="post-detail">
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-3">{post.title}</h1>
                        <p className="lead">{post.user && post.user.username}</p>
                    </div>
                    <div className="row content">
                        <div className="col-md-12">
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

PostDetail.getInitialProps = async ({query}) => {
    return {query}
}

export default withApollo(PostDetail, {getDataFromTree})
