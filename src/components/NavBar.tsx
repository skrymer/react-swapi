import * as React from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

interface Props { }

const NavBar: React.FC<Props> = (props) => {
    const history = useHistory()
    
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    React SWAPI
                </Menu.Item>
                <Menu.Item as='a' onClick={() => history.push('/')}>Home</Menu.Item>

                <Dropdown item text='Resources'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => history.push('/persons')}>People</Dropdown.Item>
                        <Dropdown.Item onClick={() => history.push('/starships')}>Starships</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
    );
};

export default NavBar;