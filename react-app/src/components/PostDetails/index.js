import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../store/post";
import { useParams } from "react-router";

const PostDetails = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  const allPost = posts.Posts;
  console.log(allPost);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const post = allPost?.find((post) => post.id === +postId);

 return ( 
     <div>
      { post ? (
          <>
        <div>
          <img width="50px" src={`${post.user.profile_pic}.png`} />
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
      </>
      
      ): null}
    </div>
  );
};

export default PostDetails;
