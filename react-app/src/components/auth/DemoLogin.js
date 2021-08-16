import React from 'react';
import { useDispatch } from 'react-redux';
import { loginDemo } from '../../store/session';

const DemoLoginButton = () => {
  const dispatch = useDispatch()
  const onDemoLogin = async (e) => {
    await dispatch(loginDemo());
  };

  return <button onClick={onDemoLogin}>Demo User</button>;
};

export default DemoLoginButton;