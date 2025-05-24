export const GET_TOTAL_SUPPLY: string = `
    import AllDay from 0xAllDay

    access(all) fun main(): UInt64 {    
        return AllDay.totalSupply
    }
`;
