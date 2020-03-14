import React, {Component} from "react";
import classNames from "classnames";
import {groupBy, sortBy, map} from "lodash";
import {randomId} from "./helper.jsx";
import HighchartGraphBox from "./graph-highchart.jsx";

class SeasonBox extends Component {
  constructor(props){
    super(props);

    this.state = {
      // rating by descending order
      rated: sortBy(props.episodes, e=>e.rating).reverse()
    }
  }

  render(){
    const episodes = this.state.rated.map(e=>{
      const name = e.name;
      const rating = e.rating;
      return (
        <div>
          {name}:
          <span className="blue-text right">{rating}</span>
        </div>
      );
    })

    // Let's play fancy by drawing a chart
    const containerId = randomId();
    const title = "Season "+this.props.season;
    const categories = this.state.rated.map(r=>{
      return r.name;
    });

    const data = [{
      name: this.props.season,
      data: this.state.rated.map(r=>{
        return r.rating;
      })
    }];

    return (
      <div className="row">
        <h3>Season {this.props.season}</h3>
        <div className="col l6 m6 s12">
          {episodes}
        </div>
        <div className="col s6 m6 s12">
          <HighchartGraphBox
            containerId={containerId}
            categories={categories}
            data={data}
            type="bar"
            yLabel="Rating"
            legentEnabled={false} />
        </div>
      </div>
    );
  }
}


class EpisodeBox extends Component {
  render() {
    // nothing to render
    if (this.props.episodes.length<1) return null;

    const groupedBySeason = groupBy(this.props.episodes, e=>e.season);
    const seasons = map(groupedBySeason, (episodes, season)=>{
      return (
        <SeasonBox season={season}
                   episodes={episodes} />
      )
    });


    return (
      <div>
        {seasons}
      </div>
    );
  }
}

export default EpisodeBox;
