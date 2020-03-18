import React, {Component} from "react";
import AjaxContainer from "./ajax.jsx";

class TheMovieDbContainer extends Component {
  constructor(props){
    super(props);

    this.state={
      api: "https://api.themoviedb.org/3/find/",
      token:"e3c272cc822b221997e768121dc30bff",
      // this can be read from a config
      // NOTE: no trailing slash!
      imageBase: "http://image.tmdb.org/t/p/w500"
    }

    // binding
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(data){
    // TMDB api
    // Since we are using IMDB ID for the search, I'm expecting
    // exactly one movie coming back, or an [].
    if (data.movie_results.length>0){
      let movie = data.movie_results[0];
      let normalized = {
        imdbID: this.props.imdbID,
        gallery:[]
      };

      if (movie.backdrop_path){
        normalized.gallery.push({
          src: this.state.imageBase+movie.backdrop_path,
          text: "backdrop"
        })
      }

      if (movie.poster_path){
        normalized.gallery.push({
          src: this.state.imageBase+movie.poster_path,
          text: "poster"
        })
      }

      this.props.handleUpdate(normalized);
    }
  }


  render(){
    const encodedID=encodeURI(this.props.imdbID);
    const query = this.state.api+encodedID+
                  "?api_key="+this.state.token+
                  "&external_source=imdb_id";

    return (
      <AjaxContainer
        apiUrl={query}
        handleUpdate={this.handleUpdate} />
    )
  }
}

export default TheMovieDbContainer;
