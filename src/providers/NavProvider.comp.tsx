import { createContext, useContext, useEffect, useState } from 'react'
import { useSeries } from './SeriesProvider.comp';
import { useSets } from './SetsProvider.comp';
import { useEditions } from './EditionsProvider.comp';
import { getSetsWithinSeries } from '../utils/nav';
import { sessionService as session } from "../services/session";
import { SESSION_KEYS } from "../constants/session-keys";

const NavContext = createContext<{ navOptions: [number, string[]][] }>(null);

export default function NavProvider({ children }) {

    const [navOptions, setNavOptions] = useState<[number, string[]][]>(null);

    const { series } = useSeries();
    const { sets } = useSets();
    const { editionsMap } = useEditions();

    useEffect(() => {
        if (navOptions) return;
        else if (session.hasKey(SESSION_KEYS.NAV_OPTIONS)) {;
            setNavOptions(Array.from(session.get(SESSION_KEYS.NAV_OPTIONS)));
        } else if (series && sets && editionsMap) {            
            const options: [number, string[]][] = getSetsWithinSeries(series, sets, editionsMap);
            session.set(SESSION_KEYS.NAV_OPTIONS, options);
            setNavOptions(options);
        }
    }, [series, sets, editionsMap]);

    return (
        <NavContext.Provider value={{ navOptions }}>
            {children}
        </NavContext.Provider>
    )
}

export const useNav = () => {
    return useContext(NavContext)
}
