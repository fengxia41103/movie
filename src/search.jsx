import React, {Component} from "react";
import classNames from "classnames";
import {DebounceInput} from 'react-debounce-input';
import {randomId} from "./helper.jsx";
import AjaxContainer from "./ajax.jsx";

class SearchBox extends Component {
  constructor(props){
    super(props);

    this.state={
      imdbApi: "http://www.omdbapi.com/",
      imdbToken: "c6638eb9",
      searching: null,
      changed: false
    }

    // binding
    this.handleChange = this.handleChange.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  handleChange(event) {
    const changed = !(this.state.searching===event.target.value);

    this.setState({
      searching: event.target.value,
      changed: changed
    });

  }

  getQuery(){
    return this.state.imdbApi+"?apikey="
          +this.state.imdbToken
          +"&t="
          +encodeURI(this.state.searching);
  }

  render() {
    // If search text has changed,
    // call IMDB API to get data.

    if (this.state.changed){
      const query = this.getQuery();

      // reset the flag
      this.setState({
        changed: false
      })

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
