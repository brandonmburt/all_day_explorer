import React, { createContext, useContext } from 'react'
import useAllSeries from '../hooks/use-all-series.hook'

const SeriesContext = createContext()

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
