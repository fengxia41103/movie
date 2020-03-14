import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import {randomId} from "./helper.jsx";



class GalleryBox extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      showing: 1,
    }

    //binding
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  componentWillMount(){
    // register key event to allow
    // navigation using arrow keys
    const that = this;
    document.onkeydown = e=> {
      switch (e.keyCode) {
        case 37:
          // left arrow key
          that.onPrev();
          break;
        case 39:
          // right arrow key
          that.onNext();
          break;
      }
    };
  }

  onNext(){
    const showing = this.state.showing;
    const images = this.props.images;

    if (showing === images.length){
      // Circle back to beginning
      this.setState({
        showing: 1
      })
    }else{
      // set current to next
      this.setState({
        showing: showing+1
      })
    }
  }

  onPrev(){
    const showing = this.state.showing;
    const images = this.props.images;

    if (showing == 1){
      // Circle back
      this.setState({
        showing: images.length-1
      });
    }else{
      this.setState({
        showing: showing-1
      })
    }
  }

  render() {
    // showing is index of 1
    const showing = this.props.images[this.state.showing-1];

    return (
      <figure>
        <img
          src={showing.src}
          alt={showing.text}
          className="responsive-image"
          onClick={this.onNext}
          onMouseEnter={this.onNext} />
      </figure>
    );
  }
}

export default GalleryBox;
