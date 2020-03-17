import React, {Component} from 'react';
import AjaxContainer from './ajax.jsx';

//****************************************
//
//    YAML JSON file loader
//
//****************************************
class AjaxJsonFileContainer extends Component{
  constructor(props){
    super(props);

    this.workHorse = this.workHorse.bind(this);
  }

  workHorse (api, handleUpdate){
    // Work horse
    fetch(api).then(resp=> {
      return resp.text();
    })
    .then(text=>{
      if ((typeof text != "undefined") && text) {
        handleUpdate(text);
      }
    })
    .catch(error=> {});
  }

  render() {
    return (
      <AjaxContainer
        workHorse ={this.workHorse}
        {...this.props} />
    );
  }
}

module.exports = AjaxJsonFileContainer;
