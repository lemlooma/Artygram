import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./Navbar.css";

const NavBar = ({ userdata, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

  const history = useHistory();
  const artygram = "https://i.imgur.com/t3Mtt7E.png";
  const addpic = "https://i.imgur.com/3yiJpcr.png";

  const postButton = (e) => {
    e.preventDefault();
    history.push("/posts/new");
  };

  const settingsButton = (e) => {
    e.preventDefault();
    history.push(`/users/${userdata.username}/edit`);
  };

  const profileButton = (e) => {
    e.preventDefault();
    history.push(`/users/${userdata.username}`);
  };



  return (
    <div className='navbar__container'>

      <div className='logo__container'>
        <NavLink exact to="/">
          <img alt={`artygram`} className="artygram_logo" src={`${artygram}`}></img>
        </NavLink>
      </div>
      <div className='search__container'>
        <input className="search" type="text" placeholder=" Search " />
      </div>
      <div className='right-navbar'>
        <div className='addpost__container'>
          <NavLink exact to="/post/new">
            <img alt={`addpic`} className="addpic" src={`${addpic}`}></img>
          </NavLink>
        </div>
        {user ?
          <div className='logout__container'>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
          : ''}
      </div>
    </div>
  );
};
export default NavBar;
