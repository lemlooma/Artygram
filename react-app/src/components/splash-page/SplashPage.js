import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./SplashPage.css";
import DemoLogin from "../auth/DemoLogin";

export default function SplashPage({authenticated }) {
    if (authenticated) {
         return <Redirect to="/" />;
    }

    return (
      <div className="splash__container">
        <div className="header__container">
          <i className="fab fa-instagram fa-3x"></i>
        </div>
        <div className="main__container">
          <div className="grid__container">
            <div className="grid__container-row">
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/H33yrU9.png"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/vtj2cbj.png"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/kMZQ4Gk.png"
              />
            </div>
            <div className="grid__container-row">
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/3l5lawF.png"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/5FA46lU.png"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/P41DXYr.png"
              />
            </div>
            <div className="grid__container-row">
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/fnP2Wtw.png"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/kGYAZXI.png"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://i.imgur.com/2k4Bdq6.png"
              />
            </div>
          </div>
          <div className="content__container">
            <h2 className="content-title"></h2>
            <NavLink to="/login" className="log-in-button">
              <span className="text">Log In</span>
            </NavLink>
            <NavLink to="/sign-up" className="sign-up-button">
              <span className="text">Sign up</span>
            </NavLink>
            <DemoLogin to="/demo"
                />
          </div>
        </div>
      </div>
    );};