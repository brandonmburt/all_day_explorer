export const GET_ALL_PLAYS: string = `
    import AllDay from 0xAllDay

    pub fun main(): [AllDay.PlayData] {
        let plays: [AllDay.PlayData] = []
        var id: UInt64 = 1
        // Note < , as nextPlayID has not yet been used
        while id < AllDay.nextPlayID {
            plays.append(AllDay.getPlayData(id: id))
            id = id + 1
        }
        return plays
    }
`;
