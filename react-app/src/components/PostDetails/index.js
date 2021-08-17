import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../store/post";
import { useParams, useHistory } from "react-router-dom";
import { deleteOnePost } from "../../store/post";

const PostDetails = () => {
    const { postId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const posts = useSelector((state) => Object.values(state.posts));

    // const allPost = posts.Posts;
    // console.log(allPost);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const post = posts?.find((post) => post.id === +postId);

    const handleDelete = async () => {
        let swo = await dispatch(deleteOnePost(postId))
        if (swo) {
            history.push('/')
        }
    }

    return (
        <div>
            {post ? (
                <>
                    <div>
                        <img width="50px" src={`${post.user.profile_pic}`} />
                        <span> {post.user.username}</span>
                    </div>
                    <div>
                        <img width="600px" src={post.pic_url} alt={`img-${post.id}`} />
                    </div>
                    <button>
                        <i class="far fa-heart"></i>
                    </button>
                    <div>likes: {post.likesnum}</div>
                    <div>{post.caption}</div>
                    <div>comments: {post.commentsnum}</div>
                    <div>{post.timestamp}</div>
                    <button onClick={handleDelete}>Delete Post</button>
                </>

            ) : null}
        </div>
    );
};

export default PostDetails;
