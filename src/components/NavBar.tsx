import { useSeries } from '../providers/SeriesProvider.comp';
import { useNav } from '../providers/NavProvider.comp';
import { SeriesNav } from "./SeriesNav";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useTheme } from '../providers/ThemeProvider.comp';
import { MAIN_LINKS, EVALUATE_LINKS } from '../constants/links';

export function NavBar() {

    const { theme } = useTheme();
    const { series } = useSeries();
    const { navOptions } = useNav();

    return (
        <Navbar sticky='top' className='nav-styles' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand>
                    <img
                        src={theme === 'light' ? '/logo/primary-light-theme.png' : '/logo/primary-dark-theme.png'}
                        alt="All Day Tools"
                        style={{ width: '100px' }}
                    />
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
                        {navOptions &&
                            navOptions.map(([seriesId, setIdAndNamesArr]) => {
                                const s = series.get(seriesId);
                                return <SeriesNav key={seriesId} id={s.id} name={s.name} active={s.active} sets={setIdAndNamesArr} />;
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
