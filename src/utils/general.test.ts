import { convertSeriesTiersMapToArr, generateTeamObjMapByType, getSeriesTiersMap, generateTeamObjMapByTier } from './general';

describe('getSeriesTiersMap', () => {
    it('should create a SeriesTiers map with a single series', () => {
        const inputSeries = new Map([[1, { id: 1, active: true, name: 'Test Series' }]]);
        const result = getSeriesTiersMap(inputSeries);

        expect(result.size).toBe(1);
        expect(result.get(1)).toEqual({
            name: 'Test Series',
            COMMON: 0,
            UNCOMMON: 0,
            RARE: 0,
            LEGENDARY: 0,
            ULTIMATE: 0
        });
    });

    it('should return an empty map for an empty input map', () => {
        const inputSeries = new Map();
        const result = getSeriesTiersMap(inputSeries);

        expect(result.size).toBe(0);
    });

    it('should create SeriesTiers entries for multiple series', () => {
        const inputSeries = new Map([
            [1, { id: 1, active: false, name: 'Series A' }],
            [2, { id: 2, active: true, name: 'Series B' }]
        ]);
        const result = getSeriesTiersMap(inputSeries);

        expect(result.size).toBe(2);
        expect(result.get(1)).toBeTruthy();
        expect(result.get(2)).toBeTruthy();
    });

    it('should handle null input gracefully', () => {
        const result = getSeriesTiersMap(null);
        expect(result.size).toBe(0);
    });

    it('should handle undefined input gracefully', () => {
        const result = getSeriesTiersMap(undefined);
        expect(result.size).toBe(0);
    });

});

describe('convertSeriesTiersMapToArr', () => {
    it('should convert a map with a single entry to an array and calculate TOTAL', () => {
        const inputMap = new Map([
            [1, { name: 'Series A', COMMON: 1, UNCOMMON: 2, RARE: 3, LEGENDARY: 0, ULTIMATE: 0 }]
        ]);

        const result = convertSeriesTiersMapToArr(inputMap);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ name: 'Series A', COMMON: 1, UNCOMMON: 2, RARE: 3, LEGENDARY: 0, ULTIMATE: 0, TOTAL: 6 });
    });

    it('should convert a map to an array and calculate TOTAL', () => {
        const inputMap = new Map([
            [1, { name: 'Set 1', COMMON: 2, UNCOMMON: 3, RARE: 1, LEGENDARY: 0, ULTIMATE: 1 }],
            [2, { name: 'Set 2', COMMON: 5, UNCOMMON: 0, RARE: 2, LEGENDARY: 1, ULTIMATE: 0 }]
        ]);

        const result = convertSeriesTiersMapToArr(inputMap);

        expect(result).toHaveLength(2);

        expect(result[0]).toEqual({ name: 'Set 1', COMMON: 2, UNCOMMON: 3, RARE: 1, LEGENDARY: 0, ULTIMATE: 1, TOTAL: 7 });
        expect(result[1]).toEqual({ name: 'Set 2', COMMON: 5, UNCOMMON: 0, RARE: 2, LEGENDARY: 1, ULTIMATE: 0, TOTAL: 8 });
    });

    it('should return an empty array for an empty input map', () => {
        const inputMap = new Map();
        const result = convertSeriesTiersMapToArr(inputMap);
        expect(result).toEqual([]);
    });

    it('should return an empty array for null input', () => {
        const result = convertSeriesTiersMapToArr(null);
        expect(result).toEqual([]);
    });

    it('should return an empty array for undefined input', () => {
        const result = convertSeriesTiersMapToArr(undefined);
        expect(result).toEqual([]);
    });

    it('should calculate TOTAL correctly when all rarities are zero', () => {
        const inputMap = new Map([
            [1, { name: 'Series Zeros', COMMON: 0, UNCOMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0 }]
        ]);
        const result = convertSeriesTiersMapToArr(inputMap);
        expect(result[0].TOTAL).toBe(0);
    });
});

describe('generateTeamObjMapByType', () => {
    it('should generate the correct team object map and types object for given play types and teams', () => {
        const playTypes = ['Passing', 'Rushing', 'Defense'];
        const teams = new Map([['Team A', 'ATL'], ['Team B', 'NE']]);

        const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

        expect(teamObjMap.size).toBe(2);
        expect(teamObjMap.get('Team A')).toEqual({ total: 0, Passing: 0, Rushing: 0, Defense: 0 });
        expect(teamObjMap.get('Team B')).toEqual({ total: 0, Passing: 0, Rushing: 0, Defense: 0 });

        expect(typesObj).toEqual({ total: 0, Passing: 0, Rushing: 0, Defense: 0 });
    });

    it('should handle empty play types and teams gracefully', () => {
        const playTypes: string[] = [];
        const teams = new Map();

        const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

        expect(teamObjMap.size).toBe(0);
        expect(typesObj).toEqual({ total: 0 });
    });
});

describe('generateTeamObjMapByTier', () => {
    it('should generate the correct team object map and tiers object for given tiers and teams', () => {
        const tiers = ['COMMON', 'RARE', 'LEGENDARY'];
        const teams = new Map([['Team A', 'ATL'], ['Team B', 'NE']]);

        const [teamObjMap, tiersObj] = generateTeamObjMapByTier(tiers, teams);

        expect(teamObjMap.size).toBe(2);
        expect(teamObjMap.get('Team A')).toEqual({ total: 0, COMMON: 0, RARE: 0, LEGENDARY: 0 });
        expect(teamObjMap.get('Team B')).toEqual({ total: 0, COMMON: 0, RARE: 0, LEGENDARY: 0 });

        expect(tiersObj).toEqual({ total: 0, COMMON: 0, RARE: 0, LEGENDARY: 0 });
    });

    it('should handle empty tiers and teams gracefully', () => {
        const tiers: string[] = [];
        const teams = new Map();

        const [teamObjMap, tiersObj] = generateTeamObjMapByTier(tiers, teams);

        expect(teamObjMap.size).toBe(0);
        expect(tiersObj).toEqual({ total: 0 });
    });
});