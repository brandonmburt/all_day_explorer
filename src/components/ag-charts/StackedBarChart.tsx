import { AgChartsReact } from 'ag-charts-react';
import { isMobile } from '../../utils/general';
import { Row } from 'react-bootstrap';
import { numFormat } from '../../utils/num';
import { useTheme } from '../../providers/ThemeProvider.comp';
import { ABBREVIATION_TO_TEAM_MAP } from '../../constants/teams';

function renderer(params) {
    return {
        title: (ABBREVIATION_TO_TEAM_MAP.get(params.xValue) || params.xValue) +
            (params.yKey === 'total' ? '' :  `: ${params.yKey}`),
        content: numFormat(params.yValue),
    };
}

interface StackedBarChartProps {
    data: any[];
    yKeys: string[];
    title?: string;
    mobileTitle?: string;
    mb?: string;
}

export default function AgStackedBarChart(props: StackedBarChartProps) {

    const { theme } = useTheme();

    const mobile = isMobile();
    const title = mobile ? props.mobileTitle ?? '' : props.title ?? '';
    const styles = { marginBottom: props.mb || '30px' };

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
        <Row className={!mobile ? 'bar-chart-container' : 'bar-chart-container-mobile'} style={styles}>
            <AgChartsReact options={{
                data: props.data,
                series: seriesDefs,
                legend: {
                    position: 'bottom',
                    enabled: !mobile
                },
                title: {
                    color: theme === 'light' ? '#374249' : '#b4dffd',
                    text: title
                },
                theme: {
                    baseTheme: theme === 'light' ? 'ag-default-theme' : 'ag-default-dark'
                },
                navigator: {
                    enabled: mobile,
                },
                background: {
                    fill: 'transparent',
                },
                // className: !mobile ? 'bar-chart-container' : 'bar-chart-container-mobile'
            }} />
        </Row>
    )
}