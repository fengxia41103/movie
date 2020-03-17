import React, {Component} from "react";
import classNames from "classnames";
import AjaxContainer from "./ajax.jsx";
import AjaxJsonFileContainer from "./ajax_json.jsx";
import GalleryBox from "./gallery.jsx";
import LocationBox from "./locations.jsx";
import QuoteBox from "./quotes.jsx";
import SnippetsBox from "./snippets.jsx";
import EpisodeBox from "./episodes.jsx";
import SubtitleBox from "./subtitle.jsx";
import CrewBox from "./crews.jsx";
import RatingBox from "./ratings.jsx";
import {dictHasNoValues} from "./helper.jsx";
import LangBox from "./lang.jsx";

class MovieBox extends Component {
  constructor(props){
    super(props);

    this.state={
      json_data_server: "data/",
      langData: {
        en: "en_US.json",
        pg: "la_PG.json"
      },
      lang: "en",
      omdbApi: "https://www.omdbapi.com/",
      omdbToken: "c6638eb9",
      imdbID:null,
      data:null,
      showingTitle: ""
    }


    // binding
    this.handleUpdate = this.handleUpdate.bind(this);
    this.normalizeData = this.normalizeData.bind(this);
    this.onLang = this.onLang.bind(this);
  }

  onLang(lang){
    this.setState({
      lang: lang,
      data: null // enforce data reload
    })
  }

  handleUpdate(data){
    // handler to ajax calls that will retrieve
    // data from various sources
    const normalized = this.normalizeData(data);
    this.setState({
      showingTitle: normalized.title,
      data: normalized
    });
  }

  normalizeData(data){
    // normalize data coming from different sources
    const title = data.Title? data.Title: data.heading;

    let normalized = {
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
      metaScore: data.Metascore || "",
      imdbRating: parseFloat(data.imdbRating || ""),
      imdbVotes: parseInt(data.imdbVotes || ""),
      imdbID: data.imdbID,
      type: data.Type || "",
      dvd: data.DVD || "",
      boxOffice: data.BoxOffice || "",
      production: data.Production || "",
      rated: data.Rated || ""
    }

    // Anything says "N/A" should be an empty string.
    // Individual component will determine how to handle this.
    // By default, it will render nothing.
    for (let key in normalized){
      if (normalized[key] == "N/A"){
        normalized[key] = "";
      }
    }

    return normalized;
  }

  render(){
    const langs = Object.keys(this.state.langData);
    if (!!this.props.imdbID && this.state.data === null) {
      // if given an IMDB ID, query to get more movie info
      // using OMDB API

      const query = this.state.omdbApi+"?apikey="
                   +this.state.omdbToken
                   +"&i="
                   +encodeURI(this.props.imdbID);
      return (
        <AjaxContainer
          apiUrl={query}
          handleUpdate={this.handleUpdate} />
      )
    }else{
      if (this.state.data === null){
        // if no IMDB ID, load from data JSON
        const query = this.state.json_data_server+this.state.langData[this.state.lang];
        return (
          <AjaxJsonFileContainer
            apiUrl={query}
            handleUpdate={this.handleUpdate} />
        )
      }
    }

    return (
      <div id={this.props.imdbID} className="mymovie">
        <h1>{this.state.data.title}</h1>
        <LangBox langs={langs}
                 onLang={this.onLang}/>

        <SubtitleBox
          runtime={this.state.data.runtime}
          year={this.state.data.year}
          language={this.state.data.language}
          rated={this.state.data.rated}
          metaScore={this.state.data.metaScore} />

        <div className="row">
          <div className="col l8 m6 s12">
            {this.state.data.description}

            <CrewBox
              director={this.state.data.director}
              genres={this.state.data.genres}
              writers={this.state.data.writers}
              actors={this.state.data.actors} />

            <RatingBox ratings={this.state.data.ratings}
                       imdbID={this.state.data.imdbID} />

            <LocationBox locations={this.state.data.locations} />
          </div>

          <div className="col l4 m6 s12">
            <GalleryBox
              images={this.state.data.gallery} />
          </div>
        </div>

        <QuoteBox quote={this.state.data.quote} />
        <SnippetsBox snippets={this.state.data.snippets} />
        <EpisodeBox episodes={this.state.data.episodes} />
      </div>
    )
  } // end of render
}

export default MovieBox;
