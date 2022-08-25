import React from 'react'
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { getSetsWithinSeries } from '../utils/nav.utils';
import { SeriesNav } from "../components/SeriesNav.comp";
import { Navbar, Nav, Container } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

export function NavBar() {

    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();

    let seriesSets = null;
    if (!!series && !!sets && !!editions) {
        seriesSets = getSetsWithinSeries(series, sets, editions);
    }

    return (
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand>All Day Tools</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/plays">
                            <Nav.Link>Plays</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/editions">
                            <Nav.Link>Editions</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/account">
                            <Nav.Link>Account</Nav.Link>
                        </LinkContainer>
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
