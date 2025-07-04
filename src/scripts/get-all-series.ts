export const GET_ALL_SERIES: string = `
    import AllDay from 0xAllDay

    access(all) fun main(): [AllDay.SeriesData] {
        let series: [AllDay.SeriesData] = []
        var id: UInt64 = 1
        // Note < , as nextSeriesID has not yet been used
        while id < AllDay.nextSeriesID {
            series.append(AllDay.getSeriesData(id: id))
            id = id + 1
        }
        return series
    }
`;
