import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export function TooltipWrapper(props: { content: any, children: any }) {

    const content = props.content || 'No content';

    const renderTooltip = (props) => (
        <Tooltip {...props}>
            {content}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            {props.children}
        </OverlayTrigger>
    )

}