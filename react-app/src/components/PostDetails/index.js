import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts,likeOnePost } from "../../store/post";

import { useParams, useHistory } from "react-router-dom";
import { deleteOnePost } from "../../store/post";
import EditCaption from "../EditCaption";

const PostDetails = () => {
    const { postId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector((state) => state.session.user);
    const [showEditCaption, setShowEditCaption] = useState(null)
    


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

    const likePostDetail = async () => {
         await dispatch(likeOnePost(post))
      
        }
    
    
    let edit = null;

    if (showEditCaption) {
        edit = (
            <EditCaption post={post} hideForm={() => setShowEditCaption(null)} />
        )
    }



    return (
      <div className="post-detail__container">
        {post ? (
          <>
            <div>
              <img width="50px" src={`${post.user.profile_pic}`} />
              <span> {post.user.username}</span>
            </div>
            <div>
              <img width="600px" src={post.pic_url} alt={`img-${post.id}`} />
            </div>
            <div>
              {post.postlikes.includes(user.id) ? (
                <button className="likebutton" onClick={() => likePostDetail(post)}>
                  <i class="fas liked fa-heart"></i>
                </button>
              ) : (
                <button className="likebutton" onClick={() => likePostDetail(post)}>
                  <i className="far unliked fa-heart"></i>
                </button>
              )}
            </div>
            <div>likes: {post.likesnum}</div>
            <div>
              {post.caption}{" "}
              <button onClick={() => setShowEditCaption(post.id)}>Edit</button>
            </div>

            {showEditCaption ? edit : ""}
            <div>comments: {post.commentsnum}</div>
            <div>{post.timestamp}</div>
            <i onClick={handleDelete}class="far fa-trash-alt"></i>
          </>
        ) : null}
      </div>
    );
};

export default PostDetails;
