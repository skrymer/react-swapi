import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Persons from './components/Persons';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Starships from './components/Starships';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/persons" component={Persons} />
            <Route path="/starships" component={Starships} />
            <Route path="/" component={Home} exact />
            </Switch>
        </BrowserRouter>
      </Container>
    </ApolloProvider>
  );
}

export default App;
