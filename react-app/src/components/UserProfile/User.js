import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllPosts } from "../../store/post";
import { getAllFollowing } from "../../store/session";
// import { getAllUsers } from '../../store/user';
// import PostForm from '../PostForm';
import "./user.css";

function User() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.session.user);

  const [isFollowing, setIsFollowing] = useState(
    loggedInUser.follows.map((u) => +u.id).includes(+userId)
  );

  const posts = useSelector((state) => Object.values(state.posts));


  const filteredPost = posts.filter((post) => post.user_id === +userId);

  const handleFollow = async () => {
    const response = await fetch(`/api/users/${userId}/follow`);
    const obj = await response.json();

    setUser({ ...obj.otherUser });
    console.log()
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllFollowing(loggedInUser.id))
  }, [dispatch]);

  const addpic = "https://i.imgur.com/3yiJpcr.png";

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();

      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="userPageBody">

      <div className="userDetails">
        <div>
          <img className="userProfilePic" src={user.profile_pic} alt={user.id} />
        </div>

        <div>
          <div className="userNameAndButton">

            <div className="userName">{user.username}</div>

            <div>
              {+userId !== +loggedInUser.id && (isFollowing ? (
                <button className='button' onClick={handleFollow}><strong>Unfollow</strong></button>
              ) : (
                <button className='button' onClick={handleFollow}><strong>Follow</strong></button>
              ))}
            </div>
          </div>

          <div className="postFollowerFollowing">
            <div className='post_followers_following'>
              <div className="user-posts__container">

                <div className='numberPost'><strong >{filteredPost.length}</strong> posts</div>
              </div>

              <div>
                <NavLink className='followers' to={`/user/${user.id}/followers`}>
                  <strong>{user.follow_by?.length} </strong>followers
                </NavLink>
              </div>

              <div>
                <NavLink className='following' to={`/user/${user.id}/following`}>
                  <strong>{user.follows?.length}</strong> following
                </NavLink>
              </div>

            </div>

          </div>

          <div className='userBio'>{user.bio}</div>

        </div>

      </div>

      <div className='borderContainer'>
        <div className='border'></div>
      </div>

      <div className="userPhotoFeed">
        {filteredPost.length > 0 ? (
          filteredPost.map((post) => (
            <NavLink to={`/post/${post.id}`} key={post.id}>
              <img className="userPostPhoto" src={post.pic_url} alt={post.id} />
            </NavLink>
          ))
        ) : (
          <div>

            <div className="addNewPost">
              <NavLink exact to="/post/new">
                <img alt={`addpic`} className="addPic" src={`${addpic}`}></img>
              </NavLink>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}
export default User;
