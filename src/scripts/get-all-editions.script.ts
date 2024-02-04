export const GET_ALL_EDITIONS: string = `
    import AllDay from 0xAllDay

    pub fun main(): [AllDay.EditionData] {
        let editions: [AllDay.EditionData] = []
        var id: UInt64 = 1
        // Note < , as nextEditionID has not yet been used
        while id < AllDay.nextEditionID {
            editions.append(AllDay.getEditionData(id: id))
            id = id + 1
        }
        return editions
    }
`;
