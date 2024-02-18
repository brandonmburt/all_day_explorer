import { createContext, useContext } from 'react'
import useAllSeries from '../hooks/use-all-series'
import { Series } from '../models/models'

const SeriesContext = createContext<{ series: Map<number, Series> }>(null)

export default function SeriesProvider({ children }) {
    const [series] = useAllSeries()

    return (
        <SeriesContext.Provider value={{
            series
        }}>
            {children}
        </SeriesContext.Provider>
    )
}

export const useSeries = () => {
    return useContext(SeriesContext)
}
