import React from 'react';
import SeriesProvider from "./SeriesProvider.comp";
import SetsProvider from './SetsProvider.comp';
import EditionsProvider from './EditionsProvider.comp';

export default function Providers({ children }) {

  return (
      <SeriesProvider>
        <SetsProvider>
          <EditionsProvider>
            <div className="app">
                {children}
            </div>
          </EditionsProvider>
        </SetsProvider>
      </SeriesProvider>
  )
}
