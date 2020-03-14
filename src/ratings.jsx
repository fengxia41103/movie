import React, {Component} from "react";
import classNames from "classnames";
import {dictHasNoValues} from "./helper.jsx";

class RatingBox extends Component {
  constructor(props){
    super(props);

    this.state={
      imdb: "https://www.imdb.com/title/"
    }
  }

  render() {

    // nothing to display
    if (dictHasNoValues(this.props)) return null;

    const ratings = this.props.ratings.map((r,index)=>{
      let url = "", val=r.Value;
      switch(r.Source){
        case "Internet Movie Database":
          url = this.state.imdb+this.props.imdbID;
          val = (
            <a href={url}>
              {val} &rarr;
            </a>
          );
          break;
        default:
          break;
      }
      return (
        <div key={index} className="col l6 m12 s12">
          <div className="card grey lighten-4 center-align">
            <span className="card-title myhighlight">
              {r.Source}
            </span>
            <p>
              {val}
            </p>
          </div>
        </div>
      ); // end of render
    });

    return (
      <div className="row">
        {ratings}
      </div>
    );
  }
}

export default RatingBox;
