interface RadioBtn {
    name: string;
    value: string;
    key: string;
}

export const RADIOS: RadioBtn[] = [
    { name: 'All', value: '1', key: "TOTAL" },
    { name: 'Common', value: '2', key: "COMMON" },
    { name: 'Uncommon', value: '3', key: "UNCOMMON" },
    { name: 'Rare', value: '4', key: "RARE" },
    { name: 'Legendary', value: '5', key: "LEGENDARY" },
    { name: 'Ultimate', value: '6', key: "ULTIMATE" }
];