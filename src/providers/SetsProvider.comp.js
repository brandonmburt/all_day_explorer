import React, { createContext, useContext } from 'react'
import useAllSets from '../hooks/use-all-sets.hook';

const SetsContext = createContext()

export default function SetsProvider({ children }) {
  const [ sets ] = useAllSets();

  return (
    <SetsContext.Provider value={{
      sets
    }}>
      {children}
    </SetsContext.Provider>
  )
}

export const useSets = () => {
  return useContext(SetsContext)
}
