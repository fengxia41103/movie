import React, {Component} from "react";
import classNames from "classnames";
import {DebounceInput} from 'react-debounce-input';
import {randomId} from "./helper.jsx";
import AjaxContainer from "./ajax.jsx";

class SearchBox extends Component {
  constructor(props){
    super(props);

    this.state={
      omdbApi: "http://www.omdbapi.com/",
      omdbToken: "c6638eb9",
      searching: null,
    }

    // can't use state since we are flipping it
    // in render()
    this.changed = false;

    // binding
    this.handleChange = this.handleChange.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  handleChange(event) {
    // did data change?
    this.changed = !(this.state.searching===event.target.value);

    // save whatis being searched
    this.setState({
      searching: event.target.value,
    });

  }

  getQuery(){
    // OMDBAPI url
    return this.state.omdbApi+"?apikey="
          +this.state.omdbToken
          +"&t="
          +encodeURI(this.state.searching);
  }

  render() {
    // If search text has changed,
    // call IMDB API to get data.

    if (this.changed){
      const query = this.getQuery();

      // reset the flag
      this.changed = false;

      return (
        <AjaxContainer
          apiUrl={query}
          handleUpdate={this.props.handleUpdate} />
      );
    }

    return (
      <div>
        <DebounceInput
          className="input-field"
          debounceTimeout={1000}
          value={this.state.searching}
          onChange={this.handleChange} />
      </div>
    );
  }
}

export default SearchBox;
