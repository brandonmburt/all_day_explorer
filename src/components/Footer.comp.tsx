import { useState } from 'react';
import { Container, Row } from "react-bootstrap";
import { useTheme } from "../providers/ThemeProvider.comp";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export function Footer() {

    const { theme, toggleTheme } = useTheme();
    const classes = theme === 'light' ? 'footer bg-light' : 'footer bg-dark';
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

    const toggleDarkMode = (checked: boolean) => {
        setIsDarkMode(checked);
        toggleTheme();
    };

    return (
        <div className={classes}>
            <Container>
                <Row>
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        All Day Tools
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