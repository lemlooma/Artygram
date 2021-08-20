import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllUsers } from "../store/user";

// import PostForm from '../PostForm';
import "./followers.css";

function Followers() {
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.users);
  console.log(
    allUser.users?.map((user) =>
      user.follow_by.map((followers) => console.log(followers))
    )
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="followingPageBody">
      {allUser.users?.map((user) =>
        user.follow_by.map((followBy) =>
          +userId === user.id ? (
            <>
              <div className="followersDetailContainer">
                {allUser.users?.map((user) =>
                  user.id === followBy.id ? (
                    <div>
                      <NavLink to={`/user/${followBy.id}`}>
                        <img className="profilePic" src={user.profile_pic} />
                      </NavLink>
                    </div>
                  ) : null
                )}

                <div className="followersDetail">
                  <NavLink to={`/user/${followBy.id}`}>
                    <div>{followBy.username}</div>
                  </NavLink>
                </div>
              </div>
            </>
          ) : null
        )
      )}
    </div>
  );
}

export default Followers;
