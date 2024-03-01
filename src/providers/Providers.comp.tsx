import { BrowserRouter } from 'react-router-dom'
import SeriesProvider from "./SeriesProvider.comp";
import SetsProvider from './SetsProvider.comp';
import EditionsProvider from './EditionsProvider.comp';
import PlaysProvider from './PlaysProvider.comp';
import NavProvider from './NavProvider.comp';
import ThemeProvider  from './ThemeProvider.comp';
import { ContentWrapper } from '../components/ContentWrapper';

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
