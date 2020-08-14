import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import SearchPersons from './components/Persons';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/persons" component={SearchPersons} exact />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
