import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface TooltipIconProps {
    pixels?: string;
    text: any;
}

export function TooltipIcon(props: TooltipIconProps) {

    const pixels = props.pixels || '25px';
    const message = props.text;
    const margin = '5px';

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <Button size='sm' variant="secondary"
                style={{
                    width: pixels,
                    height: pixels,
                    borderRadius: '50%',
                    justifyContent: 'center', // Center content horizontally
                    alignItems: 'center', // Center content vertically
                    padding: '0', // Adjust padding as needed
                    marginBottom: margin,
                    marginLeft: margin,
                }}
            >?</Button>
        </OverlayTrigger>
    )

}