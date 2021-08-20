import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllFollowing, getAllUsers } from "../../store/user";

// import PostForm from '../PostForm';
import "./following.css";

function Following() {
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="followingPageBody">
        
      {user.follow_by.map((followBy) => (
        <>
         <div className='followersDetailContainer'>
            
              {allUser.users?.map((user) =>
                user.id === followBy.id ? (
                  <div>
                       <NavLink to={`/user/${followBy.id}`}>
                    <img className="profilePic" src={user.profile_pic} />
                    </NavLink>
                  </div>
                ) : null
              )}
           
            <div className='followersDetail'>
            <NavLink to={`/user/${followBy.id}`}>
            <div>{followBy.username}</div>
          </NavLink>
          </div>
          </div>
        </>
      ))}
      
    </div>
  );
}

export default Following;