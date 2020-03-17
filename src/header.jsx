// header.js
import React from "react";
import "./stylesheets/header.sass";

class Header extends React.Component {
  render() {
    const background = "images/DSC_1190309.JPG";
    const style= {
      backgroundImage: `url(${background})`,
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      backgroundSize: "cover",
      color: "#efefef",
      padding: "3em 0em",
      marginBottom: "2em",
      overflowX: "hidden"
    }


    return (
      <div className="myh" style={style}>
        <div className="container">
          <h1>Movies</h1>
          <p>Make . Movie . Fun</p>
        </div>
      </div>
    );
  }
}

export default Header;
