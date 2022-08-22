import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../pages/NotFound.page'
import { Home } from '../pages/Home.page'
import { Set } from '../pages/Set.page'
import { Plays } from '../pages/Plays.page'
import { Account } from '../pages/Account.page'

export function NavRoutes() {

  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/plays" element={<Plays />} />
        <Route path="/set/:seriesID/:setID" element={<Set />} />
        <Route path="/account" element={<Account />} />
        <Route path ="*" element={<NotFound />} />
    </Routes>
  )

}
