import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {difference, merge} from "lodash";
import SearchBox from "./search.jsx";
import MovieBox from "./movie.jsx";

class RootBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{imdbID:""}],
    };

    // binding func
    this.handleUpdate = this.handleUpdate.bind(this);
  }


  handleUpdate(data){
    this.setState({
      // OMDB API data struct
      data: data.Search
    })
  }

  render() {
    const movies = this.state.data.map((m, index)=>{
      return (
        <MovieBox key={m.imdbID} imdbID={m.imdbID} />
      )
    });

    return (
      <div className="container">
        <label>Search for your favourate movie</label>
        <SearchBox handleUpdate={this.handleUpdate} />
        {movies}
      </div>
    );
  }
}

export default RootBox;
