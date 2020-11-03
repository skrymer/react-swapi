import Axios from 'axios';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dimmer, Grid, Input, Loader, Table } from 'semantic-ui-react';
import { Starship } from '../models/Starship';

interface Props { }

const Starships: React.FC<Props> = (props) => {
  const [starships, setStarships] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const history = useHistory()
  
  const handleSearch = (searchBy?: string) => {
    setLoading(true)

    Axios.get(`https://swapi.dev/api/starships?search=${searchBy}`).then((resp) => {
      setStarships(resp.data.results)
    }).finally(() => setLoading(false))
  }

  const handleStarshipSelected = (starship: Starship) => { 
    const id = starship?.url.match(/\d*\/$/g)        
    history.push(`starships/${id ? id[0] : 'unknownid'}` )
  }

  return (
    <Grid style={{ marginTop: '3em' }}>
      <Controls onSearch={handleSearch} />
      <SearchResults starships={starships} onStarshipSelected={handleStarshipSelected} />
      {loading &&
        <Dimmer active  >
          <Loader indeterminate>Loading...</Loader>
        </Dimmer>
      }
    </Grid>
  )
}

interface ControlProps {
  onSearch: (searchBy: string) => void
}

const Controls = (props: ControlProps) => {
  const [searchBy, setSearchBy] = React.useState<string>('')

  return (
    <Grid.Row>
      <Grid.Column width="4">
        <Input
          placeholder='Search by...'
          fluid
          onChange={(_, value) => setSearchBy(value.value)}
        />
      </Grid.Column>
      <Grid.Column>
        <Button onClick={() => props.onSearch(searchBy)}>Search</Button>
      </Grid.Column>
    </Grid.Row>
  )
}

interface SearchResultsProps {
  onStarshipSelected: (starship: Starship) => void
  starships?: Starship[]
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
        <Table.HeaderCell>URL</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.starships?.map((starship, idx) => <StarshipRow starship={starship} key={idx} onStarshipSelected={props.onStarshipSelected} />)}
    </Table.Body>
  </Table>
)

const StarshipRow = (props: { starship: Starship, onStarshipSelected: (starship: Starship) => void }) =>
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
    <Table.Cell>{props.starship.url}</Table.Cell>
  </Table.Row>

export default Starships;