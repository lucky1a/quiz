import { Navbar, Container } from 'react-bootstrap';

import ThemeSelector from './ThemeSelector';

function Header() {
    return (
        <Container className='mb-3'>
            <Navbar>
                <Navbar.Brand>Quiz App</Navbar.Brand>
                <ThemeSelector />
            </Navbar>
        </Container>
    );
}

export default Header;