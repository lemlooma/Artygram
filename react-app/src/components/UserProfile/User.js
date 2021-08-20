import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllPosts } from '../../store/post';
// import { getAllUsers } from '../../store/user';
// import PostForm from '../PostForm';
import './user.css'

function User() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.session.user)
  const [isFollowing, setIsFollowing] = useState(
    loggedInUser.follows.map((u) => +u.id).includes(+userId)
  );
  const posts = useSelector((state) => Object.values(state.posts))

  console.log(isFollowing)

  const filteredPost = posts.filter((post) => post.user_id === +userId)
    console.log(loggedInUser)
    const handleFollow = async() => {
    const response = await fetch(`/api/users/${userId}/follow`);
    const obj = await response.json();
    setUser({...obj.otherUser})
    setIsFollowing(!isFollowing)
}
  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

 
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      // console.log(user)
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
          <img className="userProfilePic" src={user.profile_pic} />
        </div>
        <div>
          <div>{user.username}</div>

          <div>
          {+userId !== +loggedInUser.id &&  (isFollowing ? (
              <button onClick={handleFollow}>Unfollow</button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            ))}
          </div>
          <div className="postFollowerFollowing">
          <div className='post_followers_following'>
            <div className="user-posts__container">
           
              <strong>{filteredPost.length}</strong> posts
            </div>
            <div>
              <NavLink to={`/user/${user.id}/followers`}>
                <strong>{user.follow_by?.length} </strong>followers
              </NavLink>
            </div>
            <div>
              <NavLink to={`/user/${user.id}/following`}>
                <strong>{user.follows?.length}</strong> following
              </NavLink>
              </div>
            </div>
       
          </div>
          <div>{user.bio}</div>
        </div>
      </div>
      <div></div>
      <div className="userPhotoFeed">
        {filteredPost.length > 0 ? (
          filteredPost.map((post) => (
            <img className="userPostPhoto" src={post.pic_url} />
          ))
        ) : (
          <div>Go create your first post!!!!</div>
        )}
      </div>
    </div>
  );
}
export default User;
