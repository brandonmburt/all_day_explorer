import React, { createContext, useContext } from 'react'
import useAllPlays from '../hooks/use-all-plays.hook';

const PlaysContext = createContext()

export default function PlaysProvider({ children }) {
  const [ playsMap, playTypes ] = useAllPlays();

  return (
    <PlaysContext.Provider value={{
      playsMap,
      playTypes
    }}>
      {children}
    </PlaysContext.Provider>
  )
}

export const usePlays = () => {
  return useContext(PlaysContext)
}
