import * as React from 'react';
import { Grid, Input, Table, Button } from 'semantic-ui-react';
import {Person as PersonModel } from '../models/Person';

interface Props {
    onPersonSelected: (person: PersonModel) => void
    onSearch: (query: string) => void
    searchResults: PersonModel[]
}

const Search: React.FC<Props> = (props) => {
    return (
        <Grid>
            <Controls {...props} />
            <SearchResults {...props} />
        </Grid>
    );
};

const Controls = (props: Props) => {
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

const SearchResults = (props: Props) =>
    <Grid.Row>
        <Grid.Column >
            <PersonTable
                persons={props.searchResults}
                onPersonSelected={props.onPersonSelected}
            />
        </Grid.Column>
    </Grid.Row>


const PersonTable = (props: { persons: PersonModel[], onPersonSelected: (person: PersonModel) => void }) => (
    <Table celled>
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

const PersonRow = (props: { person: PersonModel, onPersonSelected: (person: PersonModel) => void }) =>
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

export default Search;