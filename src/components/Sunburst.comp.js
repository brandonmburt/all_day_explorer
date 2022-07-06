import React from "react"
import { GenerateSunburst } from "../utils/sunburst.utils.js";
import * as d3 from 'd3'

class Sunburst extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        // let data = [];
        // this.props.data.forEach( (val, key) => data.push({name: val.name, value: val.count}) );
        let data = {
            name: "Supply",
            children: [
                {name: "Series 1", children: [{name: "rare", size: 25}, {name: "legendary", size: 10}, {name: "common", size: 100}]},
                {name: "Historical", children: [{name: "rare", size: 15}, {name: "legendary", size: 10}, {name: "common", size: 40}]}
            ]
        };
        let chart = GenerateSunburst(data, {
            value: d => d.size, // size of each node (file); null for internal nodes (folders)
            label: d => d.name, // display name for each cell
        });

        d3.select(this.myRef.current).node().appendChild(chart);
    }

    render() {
        return (
            <div ref={this.myRef}></div>
        )
    }

}

export default Sunburst;