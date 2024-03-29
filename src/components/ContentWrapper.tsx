import { useEffect, useState } from 'react';
import { useTheme } from '../providers/ThemeProvider.comp';
import { Loading } from './Loading';
import { usePlays } from '../providers/PlaysProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useNav } from '../providers/NavProvider.comp';

export const ContentWrapper = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    const { theme } = useTheme();
    const { playsMap, playTypes } = usePlays();
    const { editionsMap } = useEditions();
    const { series } = useSeries();
    const { sets } = useSets();
    const { navOptions } = useNav();

    useEffect(() => {
        setTimeout(() => {
            // Wait for 100ms before showing the loading indicator to avoid flickering on page refresh
            setShowLoadingIndicator(true);
        }, 100);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (isLoading && navOptions && playsMap && editionsMap && series && sets && playTypes) {
            setIsLoading(false);
        }
    }, [isLoading, playsMap, editionsMap, series, sets, navOptions, playTypes]);


    return isLoading ? <Loading showLoadingIndicator={showLoadingIndicator} theme={theme} /> : (
        <div className={`App-${theme}`}>
            {children}
        </div>
    );
}