import React, {Component} from "react";
import AjaxContainer from "./ajax.jsx";

class OmdbContainer extends Component {
  constructor(props){
    super(props);

    this.state={
      omdbApi: "https://www.omdbapi.com/",
      omdbToken: "c6638eb9",
    }

    // binding
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(data){
    // handler to ajax calls that will retrieve
    // data from various sources
    let normalized = data;
    normalized.title = data.Title;
    normalized.imdbID = data.imdbID;
    this.props.handleUpdate(normalized);
  }


  render(){
    const query = this.state.omdbApi+"?apikey="
                 +this.state.omdbToken
                 +"&i="
                 +encodeURI(this.props.imdbID);
    return (
        <AjaxContainer
          apiUrl={query}
          handleUpdate={this.handleUpdate} />
    )
  }
}

export default OmdbContainer;
