import React, { useRef } from "react";
import { auth } from "../../firebase";
import "./Signup.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signup">
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          placeholder="Email"
          type="email"
        />
        <input
          ref={passwordRef}
          placeholder="Password"
          type="password"
        />
        <button onClick={signin} type="submit">
          Sign In
        </button>
        <h4>
          New to Project X Movie?{" "}
          <span
            className="signupLink"
            onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default Signup;
