export const GET_ALL_SETS: string = `
    import AllDay from 0xAllDay

    pub fun main(): [AllDay.SetData] {
        let sets: [AllDay.SetData] = []
        var id: UInt64 = 1
        // Note < , as nextSetID has not yet been used
        while id < AllDay.nextSetID {
            sets.append(AllDay.getSetData(id: id))
            id = id + 1
        }
        return sets
    }
`;
