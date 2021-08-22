import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getLoginPosts, likeOnePost } from "../../store/post";


import { useParams, useHistory, Link } from "react-router-dom";
import { deleteOnePost } from "../../store/post";
import EditCaption from "../EditCaption";
import './postdetails.css'

const PostDetails = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();


  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const [showEditCaption, setShowEditCaption] = useState(null)



  useEffect(() => {
    dispatch(getLoginPosts());
  }, [dispatch]);



  const post = posts?.find((post) => post.id === +postId);

  const handleDelete = async () => {
    let swo = await dispatch(deleteOnePost(postId))
    if (swo) {
      history.push('/')
    }
  }

  const likePostDetail = async () => {
    await dispatch(likeOnePost(post))

  }


  let edit = null;

  if (showEditCaption) {
    edit = (
      <EditCaption post={post} hideForm={() => setShowEditCaption(null)} />
    )
  }

  const handleComment = () => {
    alert('comment feature is comming soon!')
  }


  return (
    <div className="photo-feed__container">
      {post ? (
        <div className="post-detail__container">
          <div class="icon-username__container">
            <Link to={`/user/${post.user_id}`}>
              <img
                className="post-icon"
                id="post-icon"
                src={`${post.user?.profile_pic}`}
              />
            </Link>
            <Link className="post-username" to={`/user/${post.user_id}`}>
              <span> {post.user?.username}</span>
            </Link>
          </div>

          <div>
            <img
              className="post-img"
              src={post.pic_url}
              alt={`img-${post.id}`}
            />
          </div>

          <div className="like-delete__container">
            {post.postlikes.includes(user.id) ? (
              <div className="div-in-post likebutton">
                <i
                  onClick={() => likePostDetail(post)}
                  class="fas liked fa-heart"
                ></i>
              </div>
            ) : (
              <div className="div-in-post likebutton">
                <i
                  onClick={() => likePostDetail(post)}
                  className="far unliked fa-heart"
                ></i>
              </div>
            )}
            <div
              className="delete-post"
              hidden={user.id === post.user_id ? false : true}
            >
              <i onClick={handleDelete} class="far fa-trash-alt"></i>
            </div>
          </div>

          <div className="div-in-post">likes: {post.likesnum}</div>

          <div className="div-in-post caption-button__container">
            <div className="post-caption__container">
              <strong>{post.user.username}</strong> {post.caption}
            </div>

            <div
              className="edit-post"
              hidden={user.id === post.user_id ? false : true}
            >
              <i
                onClick={() => setShowEditCaption(post.id)}
                className="far fa-edit"
              ></i>
            </div>
          </div>

          {showEditCaption ? edit : ""}

          {/* <div className='div-in-post'>comments: {post.commentsnum}</div> */}

          <div className="timestamp-postdetails">{post.timestamp}</div>

          <div className="div-in-post">
            <div className="post-comment__div">
              <div>comments:</div>
              <button onClick={handleComment} className="post-comment__button">
                post comment
              </button>
            </div>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => <div>{comment.caption}</div>)
            ) : (
              <div>Be the first comment here!</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostDetails;
