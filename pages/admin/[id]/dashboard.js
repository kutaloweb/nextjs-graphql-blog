import withApollo from '../../../hoc/withApollo'
import withAuth from '../../../hoc/withAuth'
import BaseLayout from '../../../layouts/BaseLayout'
import {Card, Button} from 'react-bootstrap'
import {useGetUserPosts, useDeletePost} from '../../../apollo/actions'
import {getDataFromTree} from '@apollo/react-ssr'
import Link from 'next/link'
import {formatDate} from '../../../utils/functions'

const AdminDashboard = withAuth(() => {
    const {data} = useGetUserPosts()
    const [deletePost] = useDeletePost()
    const userPosts = (data && data.userPosts) || []

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="page-title">My Posts</h1>
                        {userPosts.map(p =>
                            <Card key={p._id} className="mb-2">
                                <Card.Body>
                                    <Card.Title>{p.title}</Card.Title>
                                    <Card.Text>
                                        {formatDate(p.startDate)}
                                    </Card.Text>
                                    <Link
                                        href="/posts/[id]/edit"
                                        as={`/posts/${p._id}/edit`}>
                                        <a className="btn btn-warning mr-1">Update</a>
                                    </Link>
                                    <Button
                                        onClick={() => deletePost({variables: {id: p._id}})}
                                        variant="danger">Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}, ['admin'], {ssr: true})

export default withApollo(AdminDashboard, {getDataFromTree})
