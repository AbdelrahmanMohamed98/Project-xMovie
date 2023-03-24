import "./Login.css";
import logo from "../../assets/logo.png";
import Signup from "../../components/Signup/Signup";
import React, { useState } from "react";
import Button from "../Button/Button";

function Login() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login">
      <div className="loginBackGround">
        <img
          className="LoginScreenLogo"
          src={logo}
          alt="logo"
        />
        <button
          onClick={() => setSignIn(true)}
          className="LoginScreenButton">
          Sign In
        </button>
        <div className="loginScreenGradient" />
      </div>
      <div className="loginScreenBody">
        {signIn ? (
          <Signup />
        ) : (
          <>
            <h1>
              Unlimited films, TV programmes and
              more.
            </h1>
            <h2>
              Watch anywhere, Cancel At anytime.
            </h2>
            <h3>
              Ready to watch? Enter your email to
              create or restart your membership.
            </h3>
            <div className="loginScreenInput">
              <input
                type="email"
                placeholder="Email Address"
              />
              <Button
                onClick={() => setSignIn(true)}
                className="LoginScreenGetStarted">
                GET STARTED
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
