// header.js
import React from "react";
import "./stylesheets/header.sass";

class Header extends React.Component {
  render() {
    return (
      <div className="myheader">
        <div className="container">
          <h1>Movies</h1>
          <p>Make . Movie . Fun</p>
        </div>
      </div>
    );
  }
}

export default Header;
