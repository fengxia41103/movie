import React, {Component} from "react";
import classNames from "classnames";

// API integration points
import JsonDataContainer from "./json_data.jsx";
import OmdbContainer from "./omdb.jsx";
import TheMovieDbContainer from "./themoviedb.jsx";

// view components
import GalleryBox from "./gallery.jsx";
import LocationBox from "./locations.jsx";
import QuoteBox from "./quotes.jsx";
import SnippetsBox from "./snippets.jsx";
import EpisodeBox from "./episodes.jsx";
import SubtitleBox from "./subtitle.jsx";
import CrewBox from "./crews.jsx";
import RatingBox from "./ratings.jsx";
import LangBox from "./lang.jsx";

// helpers
import {concat, each, isNil, isEmpty} from "lodash";
import {dictHasNoValues} from "./helper.jsx";

class MovieBox extends Component {
  constructor(props){
    super(props);

    this.state={
      langs: ["en", "pg"],
      lang: "en",
      imdbID:null,
      data:null,
      showingTitle: "",
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

  normalizeData(data){
    let normalized = {
      title: data.title,
      imdbID: data.imdbID,
      description: data.description || data.Plot,
      locations: data.locations || [],
      quote: data.quote || {},
      snippets: data.snippets || [],
      gallery: data.gallery || [{"src":data.Poster, "text":data.title}],
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


  handleUpdate(data){
    let normalized = this.normalizeData(data);

    // if we already have this data, merge w/ other sources'
    if (this.state.data && normalized.imdbID === this.state.data.imdbID){
      let source = this.state.data;
      
      each(source, (val, key)=>{
        if (!isNil(val) && !isEmpty(val)){
          // we have value to merge
          if (key === "gallery"){
            // gallery is [], using _.concat
            normalized.gallery = concat(normalized.gallery, val);
          } else {
            if (isEmpty(normalized[key]) && !isEmpty(val)){
              // if source has  no value, assign one 
              normalized[key] = val;
            }
          }
        }
      });
    }

    // update data
    this.setState({
      imdbID: normalized.imdbID,
      showingTitle: normalized.title,
      data: normalized
    });
  }

  render(){
    // where to load data
    if (!!this.props.imdbID && this.state.data === null) {
      // if given an IMDB ID, query to get more movie info
      // using OMDB API
      return (
        <div>
          <OmdbContainer
            handleUpdate={this.handleUpdate}
            {...this.props}/>

          <TheMovieDbContainer
            handleUpdate={this.handleUpdate}
            {...this.props}/>
        </div>
      )
      
    }else{
      if (this.state.data === null){
        return (
          <JsonDataContainer
            lang={this.state.lang}
            handleUpdate={this.handleUpdate} />
        )
      }
    }

    // TODO: lang options are not built in dataset,
    // so we handle it by which source the data is coming from.
    // This, however, is really a bad idea!
    const langs=(!!this.state.imdbID && !!this.state.data.title)?[]:this.state.langs;

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
