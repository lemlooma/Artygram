import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import "./logout.css";

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/splash")
  };

  return <i onClick={onLogout}  className="fas fa-sign-out-alt" id='logOutButton'></i>
};

export default LogoutButton;
