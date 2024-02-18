import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { Set } from '../pages/Set';
import { Plays } from '../pages/Plays';
import { Account } from '../pages/Account';
import { Editions } from '../pages/Editions';
import { Moments } from '../pages/Moments';

export function NavRoutes() {

    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/plays" element={<Plays />} />
            <Route path="/set/:seriesID/:setID" element={<Set />} />
            <Route path="/account" element={<Account />} />
            <Route path="/editions" element={<Editions />} />
            <Route path="/moments" element={<Moments />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

}
