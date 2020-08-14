import Axios from 'axios';
import * as React from 'react';
import { Button, Grid, Input, Table, Dimmer, Loader } from 'semantic-ui-react';
import { Person } from '../models/Person';
import PersonDetails from './PersonDetails';

const Persons: React.FC = () => {
    const [persons, setPersons] = React.useState<Person[]>([])
    const [person, setPerson] = React.useState<Person>()
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

    return (
        <Grid style={{ marginTop: '3em' }}>
            {!!!person && <Controls onSearch={handleSearch} />}
            {!!!person && <SearchResults persons={persons} onPersonSelected={setPerson} />}
            {person && <PersonDetails person={person} onBackSelected={() => setPerson(undefined)} />}
            {loading &&
                <Dimmer active  >
                    <Loader indeterminate>Loading...</Loader>
                </Dimmer>
            }
        </Grid>
    )
}

interface ControlProps {
    onSearch: (query: string) => void
}

const Controls = (props: ControlProps) => {
    const [query, setQuery] = React.useState<string>('')

    return (
        <Grid.Row>
            <Grid.Column width="4">
                <Input
                    onChange={(_, data) => setQuery(data.value)}
                    placeholder='Search...'
                    fluid
                />
            </Grid.Column>
            <Grid.Column>
                <Button onClick={() => props.onSearch(query)}>Search</Button>
            </Grid.Column>
        </Grid.Row>
    )
}

interface SearchResultsProps {
    onPersonSelected: (person: Person) => void
    persons: Person[]
}

const SearchResults = (props: SearchResultsProps) =>
    <Grid.Row>
        <Grid.Column >
            <PersonTable {...props} />
        </Grid.Column>
    </Grid.Row>

const PersonTable = (props: SearchResultsProps) => (
    <Table celled >
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Birth year</Table.HeaderCell>
                <Table.HeaderCell>Eye color</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Hair color</Table.HeaderCell>
                <Table.HeaderCell>Height</Table.HeaderCell>
                <Table.HeaderCell>Mass</Table.HeaderCell>
                <Table.HeaderCell>Skin color</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {props.persons.map((person, idx) => <PersonRow person={person} key={idx} onPersonSelected={props.onPersonSelected} />)}
        </Table.Body>
    </Table>
)

const PersonRow = (props: { person: Person, onPersonSelected: (person: Person) => void }) =>
    <Table.Row>
        <Table.Cell selectable>
            <a
                href='/#'
                onClick={(e) => {
                    e.preventDefault()
                    props.onPersonSelected(props.person)
                }}
            >
                {props.person.name}
            </a>
        </Table.Cell>
        <Table.Cell>{props.person.birth_year}</Table.Cell>
        <Table.Cell>{props.person.eye_color}</Table.Cell>
        <Table.Cell>{props.person.gender}</Table.Cell>
        <Table.Cell>{props.person.hair_color}</Table.Cell>
        <Table.Cell>{`${props.person.height} (cm)`}</Table.Cell>
        <Table.Cell>{`${props.person.mass} (Kg)`}</Table.Cell>
        <Table.Cell>{props.person.skin_color}</Table.Cell>
    </Table.Row>

export default Persons;