// footer.js
import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <h5>Data source</h5>
          <ul>
            <li><a href="http://www.omdbapi.com/">OMDB</a></li>
            <li><a href="https://ibm.box.com/s/ufnb4dlv5hmfln58lt37563l0yvdw4xt">IBM</a></li>
          </ul>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <i className="fa fa-copyright"></i>2020 PY Consulting Ltd.
            <span className="grey-text text-lighten-4 right">
              Made by{" "}
              <a href="https://github.com/fengxia41103/movie">Feng Xia</a>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
