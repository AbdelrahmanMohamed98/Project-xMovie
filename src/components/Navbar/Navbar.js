import React, {
  useEffect,
  useState,
} from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/Avatar.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      transitionNavBar
    );
    return () =>
      window.removeEventListener(
        "scroll",
        transitionNavBar
      );
  }, []);

  return (
    <div className={`nav ${show && "navBlack"}`}>
      <div className="navContents">
        <Link to="/">
          <img
            className="navLogo"
            src={logo}
            alt="logo"
          />
        </Link>
        <Link to="/profile">
          <img
            className="navAvatar"
            src={avatar}
            alt="ava"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
