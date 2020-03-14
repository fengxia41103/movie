import React, {Component} from "react";
import classNames from "classnames";
import {randomId} from "./helper.jsx";

class LocationBox extends Component {
  render() {
    // nothing to display
    if (this.props.locations.length<1) return null;

    const locations = this.props.locations.map((s,index,obj)=>{
      return(
        <span key={index} className="flabel">
          {s}
        </span>
      )
    });

    return (
      <div>
        <h3>Fun facts</h3>
          <p>
            Ever wondered where some of the most classical movie
            scenes were taken? Check it out, maybe you didn't know
            that your home town has been featured in this movie!
          </p>
        {locations}
      </div>
    );
  }
}

export default LocationBox;
