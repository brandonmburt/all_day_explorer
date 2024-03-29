import { createContext, useContext } from 'react'
import useAllPlays from '../hooks/use-all-plays';
import { Play } from '../models/models';

const PlaysContext = createContext<({ playsMap: Map<number, Play>, playTypes: string[] })>(null)

export default function PlaysProvider({ children }) {
    const [playsMap, playTypes] = useAllPlays();

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
