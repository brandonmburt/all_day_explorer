import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import SeriesProvider from "./SeriesProvider.comp";
import SetsProvider from './SetsProvider.comp';
import EditionsProvider from './EditionsProvider.comp';
import PlaysProvider from './PlaysProvider.comp';
import NavProvider from './NavProvider.comp';
import ThemeProvider, { useTheme } from './ThemeProvider.comp';


const ContentWrapper = ({ children }) => {
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return (
        <div className={`App-${theme}`}>
            {children}
        </div>
    )
}

export default function Providers({ children }) {

    return (
        <BrowserRouter>
            <ThemeProvider>
                <SeriesProvider>
                    <SetsProvider>
                        <EditionsProvider>
                            <PlaysProvider>
                                <NavProvider>
                                    <ContentWrapper>
                                        {children}
                                    </ContentWrapper>
                                </NavProvider>
                            </PlaysProvider>
                        </EditionsProvider>
                    </SetsProvider>
                </SeriesProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}
