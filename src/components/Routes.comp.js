import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../pages/NotFound.page'
import { Home } from '../pages/Home.page'
import { Editions } from '../pages/Editions.page'
import { Plays } from '../pages/Plays.page'

export function NavRoutes() {

  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/plays" element={<Plays />} />
        <Route path="/editions/:seriesID/:setID" element={<Editions />} />
        <Route path ="*" element={<NotFound />} />
    </Routes>
  )

}
