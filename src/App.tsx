import Axios, { AxiosResponse } from 'axios';
import React from 'react';
import { Container, Loader, Dimmer, Segment } from 'semantic-ui-react';
import Person from './components/Person';
import Search from './components/Search';
import { Film } from './models/Film';
import { HomeWorld } from './models/HomeWorld';
import { Person as PersonModel } from './models/Person';

function App() {
  const [persons, setPersons] = React.useState<PersonModel[]>([])
  const [person, setPerson] = React.useState<PersonModel>()
  const [films, setFilms] = React.useState<Film[]>()
  const [homeWorld, setHomeworld] = React.useState<HomeWorld>()
  const [loading, setLoading] = React.useState(false)

  const handleSearch = (query: string) => {
    if (query) {
      setLoading(true)
      Axios.get(`https://swapi.dev/api/people/?search=${query.trim()}`)
        .then((values) => setPersons(values.data.results))
        .catch((errors) => console.log(errors))
        .finally(() => setLoading(false))
    }
  }

  const handlePersonSelected = (person: PersonModel) => {   
    setLoading(true)
    setPerson(person)

    Axios.get(person.homeworld)
    .then(values => setHomeworld(values.data))

    const mapFilm = (response: AxiosResponse<any>) => {
      return { title: response.data.title, url: response.data.url }
    }

    Promise.all(person.films.map(url => Axios.get(url)))
      .then((values) => setFilms(values.map(mapFilm)))
      .finally(() => setLoading(false))
  }

  const clearValues = () => {
    setPerson(undefined)
    setHomeworld(undefined)
    setFilms(undefined)
  }

  return (
    <Container style={{ marginTop: '3em' }}>
        <Dimmer active={loading}>
          <Loader content='Loading' size="huge"/>
        </Dimmer>
        {!person && <Search
          searchResults={persons}
          onSearch={handleSearch}
          onPersonSelected={handlePersonSelected}
        />}
        {person && homeWorld && films && <Person onBack={clearValues} person={person} homeWorld={homeWorld} films={films} />}
    </Container>
  );
}

export default App;
