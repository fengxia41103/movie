import React, {Component} from "react";
import ProgressBox from "./progress.jsx";
import {debounce} from "lodash";

//****************************************
//
//    Common AJAX containers
//
//****************************************
class AjaxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    // binding
    this._getData = this._getData.bind(this);
    this.debounceGetData = debounce(() => {
      this._getData();}, 200);
  }

  _getData() {
    if (this.state.loading) {
      return null;
    } else {
      this.setState({
        loading: true,
      });
    }

    // Get data
    const {apiUrl, handleUpdate} = this.props;
    console.log("Getting: " + apiUrl);

    // Work horse
    fetch(apiUrl)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        if (typeof json != "undefined" && json) {
          handleUpdate(json);
        }
      })
      .catch(error => {});
  }

  componentWillMount() {
    // Get data
    // https://medium.com/@santoshpunase/integrating-apis-in-react-js-constructor-vs-componentwillmount-vs-componentdidmount-e0b98c3efecd
    if (!this.state.loading && this.debounceGetData) {
      this.debounceGetData();
    }
  }

  render() {
    return (
      // Progress bar
      <ProgressBox />
    );
  }
}

export default AjaxContainer;
