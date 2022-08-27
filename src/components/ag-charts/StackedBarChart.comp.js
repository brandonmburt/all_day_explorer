import React, { Component } from 'react';
import { AgChartsReact } from 'ag-charts-react';

export default class AgStackedBarChart extends Component {

    constructor(props) {
        super(props);

        let seriesDefs = [];
        this.props.yKeys.forEach(k => {
            seriesDefs.push({
                type: 'column',
                xKey: 'name',
                yKey: k,
                stacked: true,
            });
        });

        this.state = {
            options: {
                data: this.props.data,
                series: seriesDefs,
                legend: {
                    position: 'bottom',
                },
                title: {
                    text: this.props.title ?? ''
                },
                theme: {
                    // baseTheme: 'ag-default-dark'
                }
            }
        }
    }

    render() {
        return (
            <AgChartsReact options={this.state.options} />
        )
    }
}
