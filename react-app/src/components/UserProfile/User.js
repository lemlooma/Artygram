import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../../store/post';
import PostForm from '../PostForm';
import './user.css'

function User() {
  // const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()
  

  
  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => Object.values(state.posts))
  const filteredPost = posts.filter((post)=> post.user_id === user.id)

  console.log(filteredPost.length)
  
  useEffect (()=>{
    dispatch(getAllPosts())
  },[]) 

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
        <img className='userProfilePic' src= {user.profile_pic} />
    </div>
    <div>
    <div >
      {user.username}
    </div>
    <div className='postFollowerFollowing'>
    <div>
      {filteredPost.length} posts
    </div>
    <div>
        followers
      </div>
      <div>
        folowing
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
       {filteredPost.map((post)=>(
         
         <img className='userPostPhoto' src={post.pic_url} />
         
       ))}
     </div>
    </div>

  );
}
export default User;
