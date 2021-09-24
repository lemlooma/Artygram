import { useSelector } from "react-redux";
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./Navbar.css";

const NavBar = ({ userdata, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)


  const artygram = "https://i.imgur.com/t3Mtt7E.png";
  const addpic = "https://i.imgur.com/3yiJpcr.png";


  // const settingsButton = (e) => {
  //   e.preventDefault();
  //   history.push(`/users/${userdata.username}/edit`);
  // };

  // const profileButton = (e) => {
  //   e.preventDefault();
  //   history.push(`/users/${userdata.username}`);
  // };


  return (
    <div className='entire__navbar'>

      {user ?
        <div className='navbar__container'>

          <div className='logo__container'>
            <NavLink exact to="/">
              <img alt={`artygram`} className="artygram_logo" src={`${artygram}`}></img>
            </NavLink>
          </div>

          {/* <div className='search__container'>
            <input className="search" type="text" placeholder=" Search feature coming soon ! " />
          </div> */}

          <div className='right-navbar'>
            <div className='addpost__container'>
              <NavLink className="addpicHover" exact to="/post/new">
                <img alt={`addpic`} className="addpic" src={`${addpic}`}></img>
              </NavLink>
            </div>
            <div className='logout__container'>
              <NavLink to={`/user/${user.id}`}>
                <img class="navbarProPic" src={user.profile_pic} alt={user.id} />
              </NavLink>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </div>
          </div>

        </div>
        : ''}
    </div>
  );
};
export default NavBar;
