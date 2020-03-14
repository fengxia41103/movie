import React, {Component} from "react";
import classNames from "classnames";
import {dictHasNoValues} from "./helper.jsx";

class SubtitleBox extends Component {
  render() {
    // nothing to render
    if (dictHasNoValues(this.props)) return null;

    return (
      <div>
        <ul className="list-inline subtitle">
          <li>
            <span className="mylabel myhighlight">IMDB</span>
            {this.props.imdbRating}
          </li><li>
            {this.props.runtime}
          </li><li>
            {this.props.year}
          </li><li>
            {this.props.rated}
          </li>
        </ul>
      </div>
    );
  }
}

export default SubtitleBox;
