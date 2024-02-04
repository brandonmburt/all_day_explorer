import { BrowserRouter } from 'react-router-dom'
import SeriesProvider from "./SeriesProvider.comp";
import SetsProvider from './SetsProvider.comp';
import EditionsProvider from './EditionsProvider.comp';
import PlaysProvider from './PlaysProvider.comp';

export default function Providers({ children }) {

  return (
      <BrowserRouter>
        <SeriesProvider>
          <SetsProvider>
            <EditionsProvider>
              <PlaysProvider>
                <div className="app">
                    {children}
                </div>
              </PlaysProvider>
            </EditionsProvider>
          </SetsProvider>
        </SeriesProvider>
      </BrowserRouter>
  )
}
