import React, { Component } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { isMobile } from '../../utils/general.utils';
import { Row } from 'react-bootstrap';

export default class AgStackedBarChart extends Component {

    constructor(props) {
        super(props);

        const mobile = isMobile();
        const title = mobile ? this.props.mobileTitle ?? '' : this.props.title ?? '';

        let seriesDefs = [];
        if (!mobile) {
            this.props.yKeys.forEach(k => {
                seriesDefs.push({
                    type: 'column',
                    xKey: 'name',
                    yKey: k,
                    stacked: true,
                });
            });
        } else {
            seriesDefs.push({
                type: 'column',
                xKey: 'name',
                yKey: 'total',
            });
        }

        this.state = {
            options: {
                data: this.props.data,
                series: seriesDefs,
                legend: {
                    position: 'bottom',
                    enabled: !mobile
                },
                title: {
                    text: title
                },
                theme: {
                    // baseTheme: 'ag-default-dark'
                },
                navigator: {
                    enabled: mobile,
                }
            }
        }

        this.state.className = !mobile ? 'bar-chart-container' : 'bar-chart-container-mobile';


    }

    render() {
        return (
            <Row className={this.state.className}>
                <AgChartsReact options={this.state.options} />
            </Row>
        )
    }
}
