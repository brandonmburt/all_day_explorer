import React, { Component } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { numFormat } from '../../utils/num.utils';

function renderer(params) {
    return {
        title: params.datum.label,
        content: numFormat(params.datum.value),
    };
}

export default class AgPieChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                data: this.props.data,
                series: [
                    {
                      type: 'pie',
                      angleKey: 'value',
                      labelKey: 'label',
                      tooltip: { renderer: renderer }
                    }
                ],
                legend: {
                    position: 'bottom',
                    enabled: false
                },
                title: {
                    text: this.props.title ?? ''
                },
                theme: {
                    // baseTheme: 'ag-default-dark'
                },
                padding: {
                    bottom: 30
                },
            }
        }
    }

    componentDidUpdate(){
        if (this.props.data !== this.state.options.data) {
            const options = { ...this.state.options };
            options.data = this.props.data;
            this.setState({ options });
        }
    }

    render() {
        return (
            <div style={{height: '350px'}}>
                <AgChartsReact options={this.state.options} />
            </div>
        )
    }
}
