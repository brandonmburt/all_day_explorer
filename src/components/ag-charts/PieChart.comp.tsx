import { AgChartsReact } from 'ag-charts-react';
import { numFormat } from '../../utils/num.utils';
import { useTheme } from '../../providers/ThemeProvider.comp';

function renderer(params) {
    return {
        title: params.datum.label,
        content: numFormat(params.datum.value),
    };
}

interface Props {
    data: any[];
    title?: string;
}

export default function AgPieChart(props: Props) {

    const { theme } = useTheme();

    return (
        <div style={{height: '350px'}}>
            <AgChartsReact options={{
                data: props.data,
                series: [{
                    type: 'pie',
                    angleKey: 'value',
                    labelKey: 'label',
                    tooltip: { renderer: renderer }
                }],
                legend: {
                    position: 'bottom',
                    enabled: false
                },
                title: {
                    text: props.title ?? ''
                },
                theme: {
                    baseTheme: theme === 'light' ? 'ag-default-theme' : 'ag-default-dark',
                },
                padding: {
                    bottom: 30
                },
            }} />
        </div>
    )
}