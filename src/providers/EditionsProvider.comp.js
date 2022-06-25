import React, { createContext, useContext } from 'react'
import useAllEditions from '../hooks/use-all-editions.hook';

const EditionsContext = createContext()

export default function EditionsProvider({ children }) {
  const [ editions ] = useAllEditions();

  return (
    <EditionsContext.Provider value={{
      editions
    }}>
      {children}
    </EditionsContext.Provider>
  )
}

export const useEditions = () => {
  return useContext(EditionsContext)
}
