import { TEAMS, ABBREVIATION_TO_TEAM_MAP } from './teams';
import { TEAM_COLORS } from './colors';

describe('Ensures all Teams/Abbreviations/Colors are provided', () => {
    it('should have a team for every abbreviation', () => {
        for (const [team, abbreviation] of TEAMS) {
            expect(ABBREVIATION_TO_TEAM_MAP.get(abbreviation)).toEqual(team);
        }
    });
    it('should have an abbreviation for every team', () => {
        for (const [abbreviation, team] of ABBREVIATION_TO_TEAM_MAP) {
            expect(TEAMS.get(team)).toEqual(abbreviation);
        }
    });
    it('should have a color for every team', () => {
        for (const team of TEAMS.values()) {
            if (!TEAM_COLORS[team]) console.log(team, 'is missing')
            expect(TEAM_COLORS[team]).toBeDefined();
        }
    });
});