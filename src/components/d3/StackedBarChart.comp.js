import React from "react";
import { StackedBarChartUtil } from "../../utils/d3/stacked-bar-chart.utils";
import * as d3 from 'd3'

class StackedBarChart extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {

        let chart = StackedBarChartUtil(this.props.data, {
            x: d => d.team,
            y: d => d.count,
            z: d => d.type,
            xDomain: d3.groupSort(this.props.data, D => d3.sum(D, d => -d.count), d => d.team),
            zDomain: this.props.types,
            colors: d3.schemeSpectral[this.props.types.length],
            colorLength: this.props.types.length,
            height: 500,
            width: 1325
        });

        d3.select(this.myRef.current).node().appendChild(chart);
    }

    render() {
        return (
            <div ref={this.myRef}></div>
        )
    }

}

export default StackedBarChart;