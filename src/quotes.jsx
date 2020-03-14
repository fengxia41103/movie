import React, {Component} from "react";
import classNames from "classnames";

class QuoteBox extends Component {
  render() {
    // nothing to display
    if (!!!this.props.text) return null;

    return (
      <div>
        <hr/>

        <p>
          Critics have been raving about this movie:
        </p>

        <blockquote>
          <p className="quotation">
            {this.props.text}
          </p>
          <footer>— {this.props.author}</footer>
        </blockquote>
      </div>
    );
  }
}

export default QuoteBox;
