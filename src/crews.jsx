import React, {Component} from "react";
import classNames from "classnames";
import {dictHasNoValues} from "./helper.jsx";

class CrewBox extends Component {
  constructor(props){
    super(props);

    this.state={
      wikipedia: "https://en.wikipedia.org/wiki/"
    }

    this.wiki = this.wiki.bind(this);
  }

  wiki(term, key){
    // save your effort
    if (term === "N/A") return term;

    const wiki = this.state.wikipedia+encodeURI(term);
    return (
      <a key={key} href={wiki}>
        {term}
      </a>
    )
  }

  render() {
    // nothing to display
    if (dictHasNoValues(this.props)) return null;

    const genres = this.props.genres.split(",").map((s,key,obj)=>{
      return this.wiki(s,key);
    });

    const director = this.wiki(this.props.director);
    const starring = this.props.actors.split(",").map((s,key,obj)=>{
      return this.wiki(s,key);
    });

    return (
      <div>
        <label>Genre</label>
        <p>{genres}</p>

        <label>Director</label>
        <p>{director}</p>

        <label>Starring</label>
        <p>{starring}</p>

        <label>Writer</label>
        <p>{this.props.writers}</p>
      </div>
    );
  }
}

export default CrewBox;
