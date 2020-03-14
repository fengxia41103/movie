import React, {Component} from "react";
import classNames from "classnames";
import {dictHasNoValues} from "./helper.jsx";

class RatingBox extends Component {
  render() {
    // nothing to display
    if (dictHasNoValues(this.props)) return null;

    let ratings = this.props.ratings.map((r,index)=>{
      return (
        <div key={index} className="col l6 m12 s12">
          <div className="card grey lighten-4 center-align">
            <span className="card-title myhighlight">
              {r.Source}
            </span>
            <p>{r.Value}</p>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        {ratings}
      </div>
    );
  }
}

export default RatingBox;
