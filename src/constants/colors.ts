interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}

export const TEAM_COLORS: Record<string, TeamColors> = {
    ARI: {
        primary: 'rgb(151,35,63)',
        secondary: 'rgb(255,182,18)',
        text: 'white',
    },
    ATL: {
        primary: 'rgb(167, 25, 48)',
        secondary: 'rgb(0, 0, 0)',
        text: 'white',
    },
    BAL: {
        primary: 'rgb(26, 25, 95)',
        secondary: 'rgb(0, 0, 0)',
        text: 'white',
    },
    BUF: {
        primary: 'rgb(198, 12, 48)',
        secondary: 'rgb(0, 51, 141)',
        text: 'white',
    },
    CAR: {
        primary: 'rgb(0, 133, 202)',
        secondary: 'rgb(16, 24, 32)',
        text: 'white',
    },
    CHI: {
        primary: 'rgb(11, 22, 42)',
        secondary: 'rgb(200, 56, 3)',
        text: 'white',
    },
    CIN: {
        primary: 'rgb(251, 79, 20)',
        secondary: 'rgb(0, 0, 0)',
        text: 'white',
    },
    CLE: {
        primary: 'rgb(255, 60, 0)',
        secondary: 'rgb(49, 29, 0)',
        text: 'white',
    },
    DAL: {
        primary: 'rgb(0, 34, 68)',
        secondary: 'rgb(134, 147, 151)',
        text: 'white',
    },
    DEN: {
        primary: 'rgb(0, 34, 68)',
        secondary: 'rgb(250, 70, 22)',
        text: 'white',
    },
    DET: {
        primary: 'rgb(0, 118, 182)',
        secondary: 'rgb(176, 183, 188)',
        text: 'white',
    },
    GB: {
        primary: 'rgb(24, 48, 40)',
        secondary: 'rgb(255, 184, 28)',
        text: 'white',
    },
    HOU: {
        primary: 'rgb(3, 32, 47)',
        secondary: 'rgb(167, 25, 48)',
        text: 'white',
    },
    IND: {
        primary: 'rgb(0, 44, 95)',
        secondary: 'rgb(162, 170, 173)',
        text: 'white',
    },
    JAX: {
        primary: 'rgb(0, 103, 120)',
        secondary: 'rgb(215, 162, 42)',
        text: 'white',
    },
    KC: {
        primary: 'rgb(227, 24, 55)',
        secondary: 'rgb(255, 184, 28)',
        text: 'white',
    },
    LV: {
        primary: 'rgb(0, 0, 0)',
        secondary: 'rgb(165, 172, 175)',
        text: 'white',
    },
    LAC: {
        primary: 'rgb(0, 128, 198)',
        secondary: 'rgb(255, 194, 14)',
        text: 'white',
    },
    LAR: {
        primary: 'rgb(0, 53, 148)',
        secondary: 'rgb(255, 209, 0)',
        text: 'white',
    },
    MIA: {
        primary: 'rgb(0, 142, 151)',
        secondary: 'rgb(252, 76, 2)',
        text: 'white',
    },
    MIN: {
        primary: 'rgb(79, 38, 131)',
        secondary: 'rgb(255, 198, 47)',
        text: 'white',
    },
    NE: {
        primary: 'rgb(0, 34, 68)',
        secondary: 'rgb(198, 12, 48)',
        text: 'white',
    },
    NO: {
        primary: 'rgb(211, 188, 141)',
        secondary: 'rgb(16, 24, 31)',
        text: 'black',
    },
    NYG: {
        primary: 'rgb(1, 35, 82)',
        secondary: 'rgb(163, 13, 45)',
        text: 'white',
    },
    NYJ: {
        primary: 'rgb(18, 87, 64)',
        secondary: 'rgb(0, 0, 0)',
        text: 'white',
    },
    PHI: {
        primary: 'rgb(0, 76, 84)',
        secondary: 'rgb(165, 172, 175)',
        text: 'white',
    },
    PIT: {
        primary: 'rgb(16, 24, 32)',
        secondary: 'rgb(255, 182, 18)',
        text: 'white',
    },
    SF: {
        primary: 'rgb(170, 0, 0)',
        secondary: 'rgb(173, 153, 93)',
        text: 'white',
    },
    SEA: {
        primary: 'rgb(0, 34, 68)',
        secondary: 'rgb(105, 190, 40)',
        text: 'white',
    },
    TB: {
        primary: 'rgb(213, 10, 10)',
        secondary: 'rgb(52, 48, 43)',
        text: 'white',
    },
    TEN: {
        primary: 'rgb(12, 35, 64)',
        secondary: 'rgb(75, 146, 219)',
        text: 'white',
    },
    WAS: {
        primary: 'rgb(90, 20, 20)',
        secondary: 'rgb(255, 182, 18)',
        text: 'white',
    },
    WFT: {
        primary: 'rgb(90, 20, 20)',
        secondary: 'rgb(255, 182, 18)',
        text: 'white',
    },
    /* begin historical teams */
    BLC: { // Baltimore Colts
        primary: 'rgb(0, 48, 135)',
        secondary: 'rgb(178, 180, 178)',
        text: 'white',
    },
    HOI: { // Houston Oilers
        primary: 'rgb(65, 143, 222)',
        secondary: 'rgb(200, 16, 46)',
        text: 'white',
    },
    OAK: { // Oakland Raiders
        primary: 'rgb(162, 170, 173)',
        secondary: 'rgb(1, 1, 1)',
        text: 'white',
    },
    OIL: { // Tennessee Oilers
        primary: 'rgb(65, 143, 222)',
        secondary: 'rgb(200, 16, 46)',
        text: 'white',
    },
    PHX: { // Phoenix Cardinals
        primary: 'rgb(155, 39, 67)',
        secondary: 'rgb(255, 255, 255)',
        text: 'white',
    },
    RAI: { // Los Angeles Raiders
        primary: 'rgb(162, 170, 173)',
        secondary: 'rgb(1, 1, 1)',
        text: 'white',
    },
    SDC: { // San Diego Chargers
        primary: 'rgb(12, 35, 64)',
        secondary: 'rgb(0, 114, 206)',
        text: 'white',
    },
    STC: { // St. Louis Cardinals
        primary: 'rgb(134, 38, 51)',
        secondary: 'rgb(255, 255, 255)',
        text: 'white',
    },
    STL: { // St. Louis Rams
        primary: 'rgb(12, 35, 64)',
        secondary: 'rgb(198, 170, 118)',
        text: 'white',
    },
}