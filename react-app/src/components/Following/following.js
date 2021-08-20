import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllFollowing, } from '../../store/user';

// import PostForm from '../PostForm';
 import './following.css'

function Following(){
    const {userId} = useParams()
    const user = useSelector((state) => state.users.user)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllFollowing(userId))
        // dispatch(getAllUsers(userId))
    },[])
    return (

    <>
            <div className='followingPageBody'>

                   {user?.follows.map((following)=>( 
                       <NavLink to={`/user/${following.id}`}>
                       <div>{following.username}</div>
                       </NavLink>
                   ))}
           </div>
    </>
    )
}

export default Following