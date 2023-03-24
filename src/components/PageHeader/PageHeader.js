import React from "react";
import "./PageHeader.scss";
import bg from "../../assets/footer-bg.jpg";

function PageHeader({ children }) {
  return (
    <div
      className="page-header"
      style={{
        backgroundImage: `url(${bg})`,
      }}>
      <h2>{children}</h2>
    </div>
  );
}

export default PageHeader;
