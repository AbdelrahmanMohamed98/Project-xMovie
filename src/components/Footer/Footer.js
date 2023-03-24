import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/logo.png";
function Footer() {
  return (
    <div
      className="footer"
      style={{
        backgroundImage: `url(${bg})`,
      }}>
      <div className="container footer__content">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to="/">xMovie</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact US</Link>
            <Link to="/">Terms</Link>
            <Link to="/">About US</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Subscription</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent Release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
