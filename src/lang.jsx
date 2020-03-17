import React, {Component} from "react";
import classNames from "classnames";
import {DropdownButton, MenuItem} from "react-bootstrap";
import {dictHasNoValues} from "./helper.jsx";

class LangBox extends Component {
  render() {
    if (this.props.langs.length<1) return null;
    
    const onLang = this.props.onLang;
    const langOptions = this.props.langs.map(lang=>{
      let active="dropdown-item";
      if (lang === this.props.lang){
        active = "dropdown-item active";
      }

      return(
        <MenuItem key={lang}
                  className={active}
                  onClick={onLang.bind(null, lang)}>
          {lang}
        </MenuItem>
      )
    });

    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
          Lang
        </button>      
        <div className="dropdown-menu">
          {langOptions}
        </div>
      </div>
    );
  }
}

export default LangBox;
