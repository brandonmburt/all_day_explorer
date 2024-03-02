import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '@mui/material/Link';
import { TooltipWrapper } from './TooltipWrapper';
import { TOOLTIPS } from '../constants/tooltips';

export function OutgoingLink({ value: editionID }) {
    
    return (
        <TooltipWrapper content={TOOLTIPS.VIEW_ON_NFLAD}>
            <Link href={`https://nflallday.com/listing/moment/${editionID}`} target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />    
            </Link>
        </TooltipWrapper>
        )
}