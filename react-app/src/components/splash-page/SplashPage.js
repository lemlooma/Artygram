import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./SplashPage.css";

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
                src="https://imgur.com/vtj2cbj"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/kMZQ4Gk"
              />
            </div>
            <div className="grid__container-row">
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/3l5lawF"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/5FA46lU"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/P41DXYr"
              />
            </div>
            <div className="grid__container-row">
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/fnP2Wtw"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/2k4Bdq6"
              />
              <img
                alt="Splash Page"
                className="grid-pic"
                src="https://imgur.com/kGYAZXI"
              />
            </div>
          </div>
          <div className="content__container">
            <h2 className="content-title"></h2>
            <NavLink to="/login" className="log-in-button">
              <span className="log-in-text">Log In</span>
            </NavLink>
            <NavLink to="/sign-up" className="sign-up-button">
              <span className="log-in-text">Sign up</span>
            </NavLink>
          </div>
        </div>
      </div>
    );};