import { Badge } from 'react-bootstrap';
import { TooltipWrapper } from '../TooltipWrapper.comp';

interface StatusBadgeProps {
    active: boolean;
}

export function StatusBadge(props: StatusBadgeProps) {

    const bg = props.active ? 'success' : 'danger';
    const TEXT = props.active ? 'Active' : 'Closed';
    const TOOLTIP_CONTENT = props.active ?
        'This series is active, meaning that new Editions and Moments can be created' :
        'This series is closed, meaning that no new Editions or Moments can be created';

    return (
        <TooltipWrapper content={TOOLTIP_CONTENT}>
            <Badge pill bg={bg}>{TEXT}</Badge>
        </TooltipWrapper>
    )
}
