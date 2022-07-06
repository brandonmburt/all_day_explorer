import React from "react"
import { PieChartUtil } from "../utils/pie-chart.utils";
import * as d3 from 'd3'

class PieChart extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        let data = [];
        this.props.data.forEach( (val, key) => data.push({name: val.name, value: val.count}) );
        let chart = PieChartUtil(data, {
            name: d => d.name,
            value: d => d.value
        })

        d3.select(this.myRef.current).node().appendChild(chart);
    }

    render() {
        return (
            <div ref={this.myRef}></div>
        )
    }

}

export default PieChart;