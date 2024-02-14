import { useState } from 'react';
import { Container, Row } from "react-bootstrap";
import { useTheme } from "../providers/ThemeProvider.comp";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export function Footer() {

    const { theme, toggleTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
    const logoURL = theme === 'light' ? 'logo/secondary-light-theme.png' : 'logo/secondary-dark-theme.png';
    const toggleDarkMode = (checked: boolean) => {
        setIsDarkMode(checked);
        toggleTheme();
    };

    return (
        <div className='footer'>
            <Container>
                <Row>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <img src={logoURL} alt="All Day Tools" style={{ width: '120px' }} />
                        <DarkModeSwitch
                            style={{ marginLeft: '1rem' }}
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            size={25}
                        />
                    </div>
                </Row>
            </Container>
        </div>
    )

}