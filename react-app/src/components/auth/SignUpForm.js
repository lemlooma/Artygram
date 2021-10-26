import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import DemoLoginButton from './DemoLogin';
import "./login-signup.css";
import Particles from "react-particles-js";


const SignUpForm = ({ setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords do no match!"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="login-form__container">
        <i className="fab fa-instagram fa-2x"></i>
        <h1 className="form-title">Sign up</h1>
        <form className="login-form" onSubmit={onSignUp}>
          <div>
            <div className="errors">
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
          </div>
          <div className="input__container">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={updateUsername}
              required
            ></input>
          </div>
          <div className="input__container">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className="input__container">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className="input__container">
            <input
              type="password"
              name="repeat_password"
              className="input"
              placeholder="Confirm Password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          {/* <div>
            <input
              className="input"
              type="text"
            ></input>
          </div> */}
          {/* Kyle's working on this optional profile picture input */}
          <button className="log-in-button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="divider__container">
          <div className="divider">
            <strong className="divider-title">OR</strong>
          </div>
        </div>
        <div className="demo-login__container">
          <DemoLoginButton />
        </div>
      </div>
      <div className="sign-up__container">
        <p className="sign-up-text">
          Already have an account?{" "}
          <NavLink className="sign-up-link" to="/login">
            Log in
          </NavLink>
        </p>
      </div>
      <Particles
        className="party"
        params={{
          particles: {
            color: {
              value: "#f60095",
            },
            number: {
              value: 60,
            },
            size: {
              value: 3,
            },
          },
        }}
      />
    </>
  );
};

export default SignUpForm;
