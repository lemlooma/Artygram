import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import DemoLogin from './DemoLogin';
import "./login-signup.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="login-form__container">
        <i className="fab fa-instagram fa-2x"></i>
        <h1 className="form-title">Artygram</h1>
        <form className="login-form" onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="input__container">
            <input
              className="input"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="input__container">
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button className="log-in-button" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div className="divider__container">
          <div className="divider">
            <strong className="divider-title">OR</strong>
          </div>
        </div>
        <div className="demo-login__container">
          <DemoLogin/>
        </div>
      </div>
      <div className="sign-up__container">
        <p className="sign-up-text">
          Don't have an account?{" "}
          <NavLink className="sign-up-link" to="/sign-up">
            Sign up
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
