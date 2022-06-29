import React from 'react'
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { getSetsWithinSeries } from '../utils/nav.utils';
import { SeriesNav } from "../components/SeriesNav.comp";
import { Navbar, Nav, Container } from "react-bootstrap"


export function NavBar() {

    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();

    let seriesSets = getSetsWithinSeries(series, sets, editions);
    if (seriesSets !== null) {
        console.log(seriesSets);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">All Day Explorer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/plays">Plays</Nav.Link>
                        {seriesSets !== null &&
                            Array.from(seriesSets).map(([key, val]) => {
                                const s = series.get(key);
                                return <SeriesNav key={key} id={s.id} name={s.name} active={s.active} sets={val} />
                            })
                        } 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}
