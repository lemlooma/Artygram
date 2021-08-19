import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./SplashPage.css";
import DemoLogin from "../auth/DemoLogin";
import Particles from "react-particles-js";


export default function SplashPage({authenticated }) {
    if (authenticated) {
         return <Redirect to="/" />;
    }

    return (
      <>
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
              <h2 className="content-title">
                The Connection between all Art and Your Heart.
              </h2>
              <NavLink to="/login" className="log-in-button">
                <span className="text">Log In</span>
              </NavLink>
              <NavLink to="/sign-up" className="sign-up-button">
                <span className="text">Sign up</span>
              </NavLink>
              <DemoLogin to="/demo" />
            </div>
          </div>
        </div>
        <div className="footer__container">
          <a href="https://github.com/lemlooma" className="footer-link">
            Lema El-Sherbiny
          </a>
          <a
            href="https://github.com/dianabeatriztinoco"
            className="footer-link"
          >
            Diana Beatriz Tinoco
          </a>
          <a
            href="https://github.com/lemlooma/Artygram"
            className="footer-link"
          >
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a href="https://github.com/KyleHere" className="footer-link">
            Kyle Tseng
          </a>
          <a href="https://github.com/tan004" className="footer-link">
            Zhuoxin Tan
          </a>
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
    );};