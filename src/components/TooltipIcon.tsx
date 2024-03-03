import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

interface TooltipIconProps {
    pixels?: string;
    marginLeft?: string;
    paddingBottom?: string;
    text: any;
}

export function TooltipIcon(props: TooltipIconProps) {

    const message = props.text;
    const STYLES = {
        color: '#6c757d',
        fontSize: props.pixels || '30px',
        marginLeft: props.marginLeft || '0',
        paddingBottom: props.paddingBottom || '0'
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <span>
                <InfoIcon style={STYLES} />
            </span>
        </OverlayTrigger>
    )

}