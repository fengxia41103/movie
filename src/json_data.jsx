import React, {Component} from "react";
import AjaxJsonFileContainer from "./ajax_json.jsx";

class JsonDataContainer extends Component {
  constructor(props){
    super(props);

    this.state={
      json_data_server: "data/",
      langData: {
        en: "en_US.json",
        pg: "la_PG.json"
      }
    }

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(data){
    // normalize data coming from different sources
    let normalized = data;
    normalized.title = data.heading;
    normalized.imdbID = "unknown";

    this.props.handleUpdate(normalized);
  }

  render (){
    // if no IMDB ID, load from data JSON
    const query = this.state.json_data_server+this.state.langData[this.props.lang];
    return (
      <AjaxJsonFileContainer
        apiUrl={query}
        handleUpdate={this.handleUpdate} />
    )
  }
}

export default JsonDataContainer;
