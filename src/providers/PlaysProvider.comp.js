import React, { createContext, useContext } from 'react'
import useAllPlays from '../hooks/use-all-plays.hook';

const PlaysContext = createContext()

export default function PlaysProvider({ children }) {
  const [ plays ] = useAllPlays();

  return (
    <PlaysContext.Provider value={{
      plays
    }}>
      {children}
    </PlaysContext.Provider>
  )
}

export const usePlays = () => {
  return useContext(PlaysContext)
}
