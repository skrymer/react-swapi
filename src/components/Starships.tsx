import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { Dimmer, Grid, Input, Loader, Table } from 'semantic-ui-react';
import { StarshipQL } from '../models/Starship';
import StarshipDetails from './StarshipDetails';

interface Props { }

const SEARCH_STARSHIPS_BY_NAME = gql`
  query SearchStarshipByName {
    allStarships {
      starships {
        name
        model
      }
    }
  }  
`;

const Starships: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery<{ allStarships: { starships: StarshipQL[] } }>(SEARCH_STARSHIPS_BY_NAME, {});
  const [starship, setStarship] = React.useState<StarshipQL>()
  const [filterBy, setFilterBy] = React.useState<string | undefined>()

  const filtered = () => {
    const regexp = new RegExp(`.*${filterBy}.*`)
    return filterBy && filterBy !== ''
      ? data?.allStarships.starships.filter((ship) => ship.name.toLowerCase().match(regexp))
      : data?.allStarships.starships
  }

  return (
    <Grid style={{ marginTop: '3em' }}>
      {!!!starship && <Controls onFilter={setFilterBy} />}
      {!!!starship && <SearchResults starships={filtered()} onStarshipSelected={setStarship} />}
      {starship && <StarshipDetails starship={starship} />}
      {loading &&
        <Dimmer active  >
          <Loader indeterminate>Loading...</Loader>
        </Dimmer>
      }
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Grid>
  )
}

interface ControlProps {
  onFilter: (filterBy: string) => void
}

const Controls = (props: ControlProps) => {
  return (
    <Grid.Row>
      <Grid.Column width="4">
        <Input
          onChange={(_, data) => props.onFilter(data.value)}
          placeholder='Filter by...'
          fluid
        />
      </Grid.Column>
    </Grid.Row>
  )
}

interface SearchResultsProps {
  onStarshipSelected: (person: StarshipQL) => void
  starships?: StarshipQL[]
}

const SearchResults = (props: SearchResultsProps) =>
  <Grid.Row>
    <Grid.Column >
      <StarshipTable {...props} />
    </Grid.Column>
  </Grid.Row>

const StarshipTable = (props: SearchResultsProps) => (
  <Table celled >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Model</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.starships?.map((starship, idx) => <StarshipRow starship={starship} key={idx} onStarshipSelected={props.onStarshipSelected} />)}
    </Table.Body>
  </Table>
)

const StarshipRow = (props: { starship: StarshipQL, onStarshipSelected: (starship: StarshipQL) => void }) =>
  <Table.Row>
    <Table.Cell selectable>
      <a
        href='/#'
        onClick={(e) => {
          e.preventDefault()
          props.onStarshipSelected(props.starship)
        }}
      >
        {props.starship.name}
      </a>
    </Table.Cell>
    <Table.Cell>{props.starship.model}</Table.Cell>
  </Table.Row>

export default Starships;