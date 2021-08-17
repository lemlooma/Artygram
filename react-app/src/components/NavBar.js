
import { useHistory } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import  "./Navbar.css";

const NavBar = ({ userdata, setAuthenticated }) => {
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
    <nav>
      <NavLink exact to="/">
        <img alt={`artygram`} className="artygram_logo" src={`${artygram}`}></img>
      </NavLink>
      <NavLink exact to="/post/new">
        <img alt={`addpic`} className="addpic" src={`${addpic}`}></img>
      </NavLink>
      <input className="search" type="text" placeholder=" Search " />
      
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
    
    </nav>
  );
};
export default NavBar;
