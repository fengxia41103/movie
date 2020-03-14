import React, {Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import {randomId} from "./helper.jsx";
import Highcharts from "highcharts";
import addFunnel from "highcharts/modules/funnel";

//****************************************
//
//    Common graph containers
//
//****************************************
class HighchartGraphBox extends Component {
  constructor(props) {
    super(props);

    this.chart = null;

    //binding
    this.makeViz = this.makeViz.bind(this);
  }

  makeViz() {

    // Chart options
    const options = {
      chart: {
        type: this.props.type,
      },
      title: {
        text: this.props.title,
      },
      subtitle: {
        text: this.props.footer,
      },
      xAxis: {
        categories: this.props.categories,
        crosshair: true,
      },
      yAxis: {
        title: {
          text: this.props.yLabel,
        },
      },
      tooltip: {
        headerFormat:
          '<h5 class="page-header">{point.key}</h5><table class="table table-striped">',
        pointFormat:
          "<tr><td><b>{series.name}</b></td>" + "<td>{point.y:,.2f}</td></tr>",
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      legend:{
        enabled: this.props.legendEnabled
      },
      series: this.props.data,
    };

    // Render chart
    this.chart = new Highcharts["Chart"](this.props.containerId, options);
  }

  componentDidMount() {
    // Initialize graph
    // Apply funnel after window is present
    Highcharts.setOptions({
      lang: {
        thousandsSep: ",",
      },
    });
    addFunnel(Highcharts);
    this.makeViz();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div className="row">
        <figure id={this.props.containerId}
                style={{minHeight: "500px"}}>
          <figcaption>{this.props.title}</figcaption>
        </figure>
      </div>
    );
  }
}

export default HighchartGraphBox;
