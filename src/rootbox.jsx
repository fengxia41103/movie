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
    console.log(data);

    return {
      title: title,
      description: data.description || data.Plot,
      locations: data.locations || [],
      quote: data.quote || {},
      snippets: data.snippets || [],
      gallery: data.gallery || [{"src":data.Poster}],
      video: data["video-embed"] || [],
      episodes: data["episode-list"] || []
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
      if (this.state.showTitle === normalized.title){
        // if title is the same, merge the data set
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


    return (
      <div className="container">
        <label>Search for your favourate movie</label>
        <SearchBox handleUpdate={this.handleUpdate} />

        <h1>{this.state.showingTitle}</h1>

        <div className="row">
          <div className="col l6 m6 s12">
            {/* always a general description */}
            {this.state.data.description}

            <LocationBox locations={this.state.data.locations} />
          </div>

          <div className="col l6 m6 s12 z-depth-5 materialboxed">
            <GalleryBox
              images={this.state.data.gallery} />
          </div>
        </div>

        <hr/>

        <QuoteBox quote={this.state.data.quote} />
        <SnippetsBox snippets={this.state.data.snippets} />

        <hr />
        <EpisodeBox episodes={this.state.data.episodes} />
      </div>
    );
  }
}

export default RootBox;
