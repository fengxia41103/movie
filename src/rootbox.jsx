import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {difference, merge} from "lodash";
import d3plus from "d3plus";
import AjaxContainer from "./ajax.jsx";
import AjaxJsonFileContainer from "./ajax_json.jsx";
import {randomId} from "./helper.jsx";
import GalleryBox from "./gallery.jsx";
import LocationBox from "./locations.jsx";
import QuoteBox from "./quotes.jsx";
import SnippetsBox from "./snippets.jsx";
import EpisodeBox from "./episodes.jsx";
import SearchBox from "./search.jsx";
import SubtitleBox from "./subtitle.jsx";
import CrewBox from "./crews.jsx";

class RootBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      json_data_server: "data/",
      data: null,
      showingTitle: ""
    };

    // binding func
    this.handleUpdate = this.handleUpdate.bind(this);
    this.normalizeData = this.normalizeData.bind(this);
  }

  normalizeData(data){
    // normalize data coming from different sources
    const title = data.Title? data.Title: data.heading;

    return {
      title: title,
      description: data.description || data.Plot,
      locations: data.locations || [],
      quote: data.quote || {},
      snippets: data.snippets || [],
      gallery: data.gallery || [{"src":data.Poster, "text":title}],
      video: data["video-embed"] || [],
      episodes: data["episode-list"] || [],
      year: data.Year || "",
      runtime: data.Runtime || "",
      director: data.Director || "",
      released: data.Released || "",
      genres: data.Genre || "",
      writers: data.Writer || "",
      actors: data.Actors || "",
      language: data.Language || "",
      country: data.Country || "",
      awards: data.Awards || "",
      ratings: data.Ratings || [],
      metascore: parseInt(data.Metascore || ""),
      imdbRating: parseFloat(data.imdbRating || ""),
      imdbVotes: parseInt(data.imdbVotes || ""),
      imdbID: data.imdbID,
      type: data.Type || "",
      dvd: data.DVD || "",
      boxOffice: data.BoxOffice || "",
      production: data.Production || "",
      rated: data.Rated || ""
    }
  }


  handleUpdate (data){
    // handler to ajax calls that will retrieve
    // data from various sources
    const normalized = this.normalizeData(data);

    if (this.state.data === null){
      // if we are initializing
      this.setState({
        showingTitle: normalized.title,
        data: normalized
      });
    } else {
      if (this.state.showingTitle === normalized.title){
        // if title is the same, merge the data set
        // TODO: should use IMDB movie ID
        this.setState({
          data: merge(this.state.data, normalized)
        })
      } else{
        // if title is different, replace the data set
        this.setState({
          showingTitle: normalized.title,
          data: normalized
        })
      }
    }
  }

  render() {
    // get bootstrap data
    if (this.state.data === null) {
      var api = this.state.json_data_server+"en_US.json";

      return (
        <AjaxJsonFileContainer
          apiUrl={api}
          handleUpdate={this.handleUpdate} />
      );
    }

    // we don't know this movie
    const hasContent = !!this.state.data.title;

    let more = false;
    if (this.state.data.imdbID){
      let url = "https://www.imdb.com/title/"+this.state.data.imdbID;
      more = (
        <a href={url}>See more on IMDB.</a>
      )
    }

    return (
      <div className="container">
        <label>Search for your favourate movie</label>
        <SearchBox handleUpdate={this.handleUpdate} />
        {hasContent?null:"No match"}

        <h1>{this.state.showingTitle}</h1>

        <SubtitleBox
          runtime={this.state.data.runtime}
          year={this.state.data.year}
          imdbRating={this.state.data.imdbRating}
          imdbVotes={this.state.data.imdbVotes}
          rated={this.state.data.rated} />

        <div className="row">
          <div className="col l6 m6 s12">
            {this.state.data.description}
            {more?more:null}

            <CrewBox
              director={this.state.data.director}
              genres={this.state.data.genres}
              writers={this.state.data.writers}
              actors={this.state.data.actors}/>

            <LocationBox locations={this.state.data.locations} />
          </div>

          <div className="col l6 m6 s12">
            <GalleryBox
              images={this.state.data.gallery} />
          </div>
        </div>

        <QuoteBox quote={this.state.data.quote} />
        <SnippetsBox snippets={this.state.data.snippets} />
        <EpisodeBox episodes={this.state.data.episodes} />
      </div>
    );
  }
}

export default RootBox;
