import { createContext, useContext } from 'react'
import useAllEditions from '../hooks/use-all-editions';
import { Edition } from '../models/models';

const EditionsContext = createContext<{ editionsMap: Map<number, Edition> }>(null)

export default function EditionsProvider({ children }) {
    const [editionsMap] = useAllEditions();

    return (
        <EditionsContext.Provider value={{ editionsMap }}>
            {children}
        </EditionsContext.Provider>
    )
}

export const useEditions = () => {
    return useContext(EditionsContext)
}
