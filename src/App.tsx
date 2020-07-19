import React from 'react';
import { Container } from 'semantic-ui-react';
import Axios from 'axios';
import { Person as PersonModel } from './models/Person';
import Search from './components/Search';
import Person from './components/Person';
import { HomeWorld } from './models/HomeWorld';

function App() {
  const [persons, setPersons] = React.useState<PersonModel[]>([])
  const [person, setPerson] = React.useState<PersonModel>()
  const [films, setFilms] = React.useState<any>()
  const [homeWorld, setHomeworld] = React.useState<HomeWorld>()

  const handleSearch = (query: string) => {
    if (query) {
      Axios.get(`https://swapi.dev/api/people/?search=${query.trim()}`)
        .then((values) => setPersons(values.data.results))
        .catch((errors) => console.log(errors))
    }
  }

  const handlePersonSelected = (person: PersonModel) => {
    setPerson(person)

    Promise.all(person.films.map(url => Axios.get(url)))
      .then((values) => setFilms(values.map(resp => resp.data)))

    Axios.get(person.homeworld).then(values => setHomeworld(values.data))
  }

  return (
    <Container style={{ marginTop: '3em' }}>
      {!person && <Search
        searchResults={persons}
        onSearch={handleSearch}
        onPersonSelected={handlePersonSelected}
      />}
      {person && <Person person={person} homeWorld={homeWorld} films={films} />}
    </Container>
  );
}

export default App;
