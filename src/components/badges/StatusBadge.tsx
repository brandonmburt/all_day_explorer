import { Badge } from 'react-bootstrap';
import { TooltipWrapper } from '../TooltipWrapper';
import { TOOLTIPS } from '../../constants/tooltips';

interface StatusBadgeProps {
    active: boolean;
}

export function StatusBadge(props: StatusBadgeProps) {

    const bg = props.active ? 'success' : 'danger';
    const TEXT = props.active ? 'Active' : 'Closed';
    const TOOLTIP_CONTENT = props.active ? TOOLTIPS.ACTIVE_BADGE : TOOLTIPS.CLOSED_BADGE;

    return (
        <TooltipWrapper content={TOOLTIP_CONTENT}>
            <Badge pill bg={bg}>{TEXT}</Badge>
        </TooltipWrapper>
    )
}
