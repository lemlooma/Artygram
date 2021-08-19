import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllPosts } from '../../store/post';
import PostForm from '../PostForm';
import './user.css'

function User() {
  // const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch()



  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => Object.values(state.posts))
  const filteredPost = posts.filter((post) => post.user_id === user.id)



  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  // if (!user) {
  //   return null;
  // }

  return (
    <div className='userPageBody'>
      <div className='userDetails'>
        <div>
          <img className='userProfilePic' src={user.profile_pic} />
        </div>
        <div>
          <div >
            {user.username}
          </div>
          <div className='postFollowerFollowing'>
            <div className='user-posts__container'>
              {filteredPost.length} posts
            </div>
            <div>
              ({user.follow_by.length}) followers
            </div>
            <div>
              <NavLink to={`/user/${user.id}/following`}>
                ({user.follows.length}) following
              </NavLink>
            </div>
          </div>
          <div>
            {user.bio}
          </div>
        </div>
      </div>
      <div>

      </div>
      <div className='userPhotoFeed'>
        {filteredPost.length > 0? filteredPost.map((post) => (
          <img className='userPostPhoto' src={post.pic_url} />
        )):
        <div>Go create your first post!!!!</div>
        }
      </div>
    </div>

  );
}
export default User;
