import Chip from '@mui/material/Chip';
import { TEAMS, ABBREVIATION_TO_TEAM_MAP } from '../../constants/teams';
import { TEAM_COLORS } from '../../constants/colors';
import { TooltipWrapper } from '../TooltipWrapper';

export function TeamBadge({ value: team }) {

    let abbreviation: string, fullTeamName: string;

    if (TEAM_COLORS[team]) { // team is the abbreviation
        abbreviation = team;
        fullTeamName = ABBREVIATION_TO_TEAM_MAP.get(team) ?? team;
    } else if (TEAMS.get(team)) { // team is the name
        fullTeamName = team;
        abbreviation = TEAMS.get(team);
    } else return (<>{team}</>);

    const teamColors = TEAM_COLORS[abbreviation] ?? null;

    return teamColors === null ? <>{team}</> : (
        <TooltipWrapper content={team}>
            <Chip
                size='small'
                sx={{
                    fontSize: true ? 'inherit' : '10px',
                    backgroundColor: teamColors.primary,
                    color: teamColors.text,
                    textAlign: 'center',
                    width: true ? '55px' : '40px',
                    height: true ? '24px' : '20px',
                    boxShadow: `inset ${teamColors.secondary} 0px -2px`,
                    borderRadius: '15px',
                }}
                label={abbreviation}
            />
        </TooltipWrapper>
    );
}
