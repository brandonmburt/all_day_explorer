import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { getSetsWithinSeries } from '../utils/nav.utils';
import { SeriesNav } from "./SeriesNav.comp";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useTheme } from '../providers/ThemeProvider.comp';

export function NavBar() {

    const { theme } = useTheme();
    const { series } = useSeries();
    const { sets } = useSets();
    const { editionsMap } = useEditions();

    let seriesSets: Map<number, Set<string>> = null;
    if (!!series && !!sets && !!editionsMap) {
        seriesSets = getSetsWithinSeries(series, sets, editionsMap);
    }

    const MAIN_LINKS: [path: string, label: string][] = [
        ['/', 'Home'],
        ['/account', 'Account'],
    ];

    const EVALUATE_LINKS: [path: string, label: string][] = [
        ['/moments', 'Moments'],
        ['/editions', 'Editions'],
        ['/plays', 'Plays'],
    ];

    const LOGO_URL = theme === 'light' ? '/logo/primary-light-theme.png' : '/logo/primary-dark-theme.png';

    return (
        <Navbar sticky='top' className='nav-styles' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand>
                    <img src={LOGO_URL} alt="All Day Tools" style={{ width: '100px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {MAIN_LINKS.map(([path, label], i) => {
                            return (
                                <LinkContainer key={i} to={path}>
                                    <Nav.Link>{label}</Nav.Link>
                                </LinkContainer>
                            )
                        })}
                        <NavDropdown title={'Evaluate'} id="basic-nav-dropdown">
                            {EVALUATE_LINKS.map(([path, label], i) => {
                                return (
                                    <LinkContainer key={i} to={path}>
                                        <NavDropdown.Item>
                                            {label}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )
                            })}
                        </NavDropdown>
                        {seriesSets !== null &&
                            Array.from(seriesSets).map(([key, val]) => {
                                const s = series.get(key);
                                return <SeriesNav key={key} id={s.id} name={s.name} active={s.active} sets={val} />;
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
