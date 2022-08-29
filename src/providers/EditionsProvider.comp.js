import React, { createContext, useContext } from 'react'
import useAllEditions from '../hooks/use-all-editions.hook';

const EditionsContext = createContext()

export default function EditionsProvider({ children }) {
  const [ editionsMap ] = useAllEditions();

  return (
    <EditionsContext.Provider value={{
      editionsMap
    }}>
      {children}
    </EditionsContext.Provider>
  )
}

export const useEditions = () => {
  return useContext(EditionsContext)
}
