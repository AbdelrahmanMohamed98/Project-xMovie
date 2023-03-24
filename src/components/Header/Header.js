import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./Header.scss";
import logo from "../../assets/logo.png";
import {
  Link,
  useLocation,
} from "react-router-dom";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
  {
    display: "Profile",
    path: "/profile",
  },
];

function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex(
    (e) => e.path === pathname
  );

  const [show, setShow] = useState(false);

  useEffect(() => {
    const shrinkHeader = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener(
      "scroll",
      shrinkHeader
    );
    return () => {
      window.removeEventListener(
        "scroll",
        shrinkHeader
      );
    };
  }, []);

  return (
    <div className={`header ${show && "shrink"}`}>
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to="/"> xMovie</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li
              key={i}
              className={`${
                i === active ? "active" : ""
              }`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
