import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPosts, likeOnePost } from "../../store/post"
import { getAllFollowing } from "../../store/session"
import './homepage.css'


const HomePage = () => {
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  const dispatch = useDispatch();

  const [getPost, setPost] = useState(false);

  const Ids = user.follows.map(user => user.id)
  Ids.push(user.id)
  const filtered = posts.filter((post) => Ids.includes(post.user_id))

  const sortedPosts = filtered.reverse()


  useEffect(() => {
    dispatch(getAllPosts())
    dispatch(getAllFollowing(user.id))
  }, [dispatch])

  useEffect(() => {
    if (getPost) {
      dispatch(likeOnePost(getPost))
      // dispatch(getAllPosts())
    }
  }, [getPost,dispatch])





  return (
    <div className="photo-feed__container">
      {sortedPosts?.map((post) => (
        <div key={post.id} className="single-post__container">
          <div className="icon-username__container">
            <Link to={`/user/${post.user_id}`}>
              <img
                className="post-icon"
                id="post-icon"
                src={`${post.user?.profile_pic}`}
                alt={[post.id]}
              />
            </Link>
            <Link className="post-username" to={`/user/${post.user_id}`}>
              <span> {post.user?.username}</span>
            </Link>
          </div>
          <div>
            <Link to={`post/${post.id}`}>
              <img
                className="post-img"
                src={post.pic_url}
                alt={`img-${post.id}`}
              />
            </Link>
          </div>
          <div className="like-button-container">
            {post.postlikes.includes(user.id) ? (
              <button className="likebutton" onClick={() => setPost(post)}>
                <i className="fas liked fa-heart"></i>
              </button>
            ) : (
              <button className="likebutton" onClick={() => setPost(post)}>
                <i className="far unliked fa-heart"></i>
              </button>
            )}
          </div>
          <div className="photofeed-details-container">
            <div>likes: {post.likesnum}</div>
            <div className="caption-photofeed">{post.caption}</div>
            {/* <div>comments: {post.commentsnum}</div> */}
            <div className="timestamp">{post.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage
