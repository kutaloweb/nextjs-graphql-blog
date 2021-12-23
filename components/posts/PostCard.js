import {formatDate} from '../../utils/functions'

const PostCard = ({post}) => {
    return (
        <div className="card subtle-shadow no-border">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{post.user.username}</h6>
                <p className="card-text fs-2">{post.content}</p>
            </div>
            <div className="card-footer no-border">
                <small className="text-muted">
                    {formatDate(post.startDate)}
                </small>
            </div>
        </div>
    )
}

export default PostCard
