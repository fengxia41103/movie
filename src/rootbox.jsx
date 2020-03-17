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
    let movies = null, found = null;
    if (!!this.state.data){
      movies = this.state.data.map(m=>{
        return (
          <MovieBox key={m.imdbID}
                    imdbID={m.imdbID}/>
        )
      });

      found = this.state.data.map(m=>{
        if (!m.imdbID) return null;

        const anchor="#"+m.imdbID;
        return (
          <a className="flabel"
             href={anchor}>
            {m.Title}
          </a>
        )
      });
    } else{
      movies = "Nothing is found. Try a different title ~~"
    }

    return (
      <div className="container">
        <label>Search for your favourate movie</label>
        <SearchBox handleUpdate={this.handleUpdate} />
        {found}
        {movies}
      </div>
    );
  }
}

export default RootBox;
