import React, {Component} from "react";
import classNames from "classnames";
import {range} from "lodash";
import {dictHasNoValues} from "./helper.jsx";

class SubtitleBox extends Component {
  constructor(props){
    super(props);

    this.state={
      movieRating:"https://en.wikipedia.org/wiki/Motion_picture_content_rating_system"
    }
  }

  render() {
    // nothing to render
    if (dictHasNoValues(this.props)) return null;

    // meta score
    let meta = null;
    if (!!this.props.metaScore){
      // metascore is 100 based, round to 10 for display
      const normalizedToTen = parseInt(this.props.metaScore)/10;
      const stars = range(Math.floor(normalizedToTen)).map(i=>{
        return (
          <i key={i}
             className="fa fa-star metascore">
          </i>
        )
      });
      meta = (
        <div>
          {stars} ({normalizedToTen}/10)
        </div>
      );
    }

    return (
      <div>
        {meta}
        <ul className="list-inline subtitle">
          <li>
            {this.props.runtime}
          </li><li>
            {this.props.year}
          </li><li>
            <a href={this.state.movieRating}>
              {this.props.rated}
            </a>
          </li><li>
            {this.props.language}
          </li>
        </ul>
      </div>
    );
  }
}

export default SubtitleBox;
