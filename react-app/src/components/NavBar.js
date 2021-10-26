import { useSelector } from "react-redux";
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./Navbar.css";

const NavBar = ({ userdata, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

  // console.log(user?.profile_pic)
  let navbar_pfp;

  if (user?.profile_pic) {
    navbar_pfp = user?.profile_pic
  }
  else {
    navbar_pfp = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
  }

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
                {user?.profile_pic === null || user?.profile_pic.includes("jpeg") || user?.profile_pic.includes("jpg") || user?.profile_pic.includes("png") || user?.profile_pic.includes("image") ? <img className="navbarProPic" src={navbar_pfp} /> : <img className="navbarProPic" src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png" />}
                {/* <img className="navbarProPic" src={navbar_pfp} alt={user.id} /> */}
              </NavLink>
            </div>
            <div>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </div>
          </div>

        </div>
        : ''}
    </div>
  );
};
export default NavBar;
