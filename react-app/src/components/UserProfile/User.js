import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getAllPosts } from '../../store/post';
// import { getAllUsers } from '../../store/user';
// import PostForm from '../PostForm';
import './user.css'

function User() {
  // const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch()

  const [user, setUser] = useState([]);
  const history = useHistory()

  const loggedInUser = useSelector((state) => state.session.user)

  const posts = useSelector((state) => Object.values(state.posts))

  const filteredPost = posts.filter((post) => post.user_id === +userId)


  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  // useEffect(()=>{
  //   dispatch(getAllUsers())
  // })


  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/users/');
  //     const responseData = await response.json();
  //     setUsers(responseData.users);

  //   }
  //   fetchData();

  //   const selectedUser = users.filter((user)=>{

  //     return userId === user.id

  //     })
  //     console.log(selectedUser)
  // }, []);



  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {

      const response = await fetch(`/api/users/${userId}`);

      if(response.ok){
        const user = await response.json();
        setUser(user);
      }
      else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return alert(data.errors);
        }
    } else {
        return ['An error occurred. Please try again.']
    }
    })();

  }, [userId]);

  if (!user.id) {
    return null;
  }



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
            <NavLink to={`/user/${user.id}/followers`}>
              {user.follow_by?.length} followers
              </NavLink>
            </div>
            <div>
              <NavLink to={`/user/${user.id}/following`}>
                {user.follows?.length} following
              </NavLink>
            </div>
          </div>
          <div>
            {user.bio}
          </div>
          <div>{user.bio}</div>
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
