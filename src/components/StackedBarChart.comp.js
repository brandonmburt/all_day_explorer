import React from "react"
import { StackedBarChartUtil } from "../utils/stacked-bar-chart.utils";
import * as d3 from 'd3'
import { numPlaysByTypeAndTeam, getUniquePlayTypes } from '../utils/plays.utils';

class StackedBarChart extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {

        const playsByTeam = numPlaysByTypeAndTeam(this.props.plays);
        const playTypes = getUniquePlayTypes(playsByTeam);

        let chart = StackedBarChartUtil(playsByTeam, {
            x: d => d.team,
            y: d => d.count,
            z: d => d.type,
            xDomain: d3.groupSort(playsByTeam, D => d3.sum(D, d => -d.count), d => d.team),
            zDomain: playTypes,
            colors: d3.schemeSpectral[playTypes.length],
            colorLength: playTypes.length,
            height: 500,
            width: 1350
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