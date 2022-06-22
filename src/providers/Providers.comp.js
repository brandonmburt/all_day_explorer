import React from 'react';
import SeriesProvider from "./SeriesProvider.comp";

export default function Providers({ children }) {

  return (
      <SeriesProvider>
        <div className="app">
            {children}
        </div>
      </SeriesProvider>
  )
}
