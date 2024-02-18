import { createContext, useContext } from 'react'
import useAllSets from '../hooks/use-all-sets';
import { Set } from '../models/models';

const SetsContext = createContext<{ sets: Map<number, Set> }>(null)

export default function SetsProvider({ children }) {
    const [sets] = useAllSets();

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
