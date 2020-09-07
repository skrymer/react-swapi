import * as React from 'react';
import { Header } from 'semantic-ui-react';

const Home: React.FC = () => {
    return (
        <div style={{ marginTop: '7em' }}>
            <Header as="h1">Welcome to React SWAPI 0.2</Header>
            <Header as="h2">Developed using</Header>
            <ul>
                <li>React</li>
                <li>Sematic ui</li>
                <li>Axios</li>
                <li>Yarn</li>
                <li>Apollo</li>
            </ul>
        </div>
    );
};

export default Home;