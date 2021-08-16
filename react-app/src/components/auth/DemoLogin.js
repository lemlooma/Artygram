import React from 'react';
import { useDispatch } from 'react-redux';
import { loginDemo } from '../../store/session';
import { useHistory } from "react-router-dom";


const DemoLoginButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onDemoLogin = async (e) => {
    await dispatch(loginDemo());
    history.push("/")
  };

  return (
    <button onClick={onDemoLogin} className="demo-button" >
      Demo User
    </button>
  );
};

export default DemoLoginButton;