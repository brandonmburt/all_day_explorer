interface RadioBtn {
    name: string;
    value: string;
    key: string;
}

export const RADIOS: RadioBtn[] = [
    { name: 'All', value: '1', key: "TOTAL" },
    { name: 'Common', value: '2', key: "COMMON" },
    { name: 'Rare', value: '3', key: "RARE" },
    { name: 'Legendary', value: '4', key: "LEGENDARY" },
    { name: 'Ultimate', value: '5', key: "ULTIMATE" }
];