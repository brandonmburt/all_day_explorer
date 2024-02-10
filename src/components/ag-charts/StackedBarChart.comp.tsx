import { AgChartsReact } from 'ag-charts-react';
import { isMobile } from '../../utils/general.utils';
import { Row } from 'react-bootstrap';
import { numFormat } from '../../utils/num.utils';
import { useTheme } from '../../providers/ThemeProvider.comp';

function renderer(params) {
    return {
        title: params.yKey === 'total' ? params.xValue : params.xValue + ': ' + params.yKey,
        content: numFormat(params.yValue),
    };
}

interface StackedBarChartProps {
    data: any[];
    yKeys: string[];
    title?: string;
    mobileTitle?: string;
}

export default function AgStackedBarChart(props: StackedBarChartProps) {

    const { theme } = useTheme();

    const mobile = isMobile();
    const title = mobile ? props.mobileTitle ?? '' : props.title ?? '';

    let seriesDefs = [];
    if (!mobile) {
        props.yKeys.forEach(k => {
            seriesDefs.push({
                type: 'column',
                xKey: 'name',
                yKey: k,
                stacked: true,
                tooltip: { renderer: renderer }
            });
        });
    } else {
        seriesDefs.push({
            type: 'column',
            xKey: 'name',
            yKey: 'total',
            tooltip: { renderer: renderer }
        });
    }

    return (
        <Row className={!mobile ? 'bar-chart-container' : 'bar-chart-container-mobile'}>
            <AgChartsReact options={{
                data: props.data,
                series: seriesDefs,
                legend: {
                    position: 'bottom',
                    enabled: !mobile
                },
                title: {
                    text: title
                },
                theme: {
                    baseTheme: theme === 'light' ? 'ag-default-theme' : 'ag-default-dark'
                },
                navigator: {
                    enabled: mobile,
                },
                // className: !mobile ? 'bar-chart-container' : 'bar-chart-container-mobile'
            }} />
        </Row>
    )
}