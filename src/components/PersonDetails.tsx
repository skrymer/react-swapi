import Axios from 'axios';
import * as React from 'react';
import { Button, Grid, Header, List, Placeholder, Segment } from 'semantic-ui-react';
import { Film } from '../models/Film';
import { HomeWorld } from '../models/HomeWorld';
import { Person } from '../models/Person';
import { Vehicle } from '../models/Vehicle';

interface Props {
    person: Person
    onBackSelected: () => void
}

const PersonDetails: React.FC<Props> = ({ person, onBackSelected }) => {
    const [films, setFilms] = React.useState<Film[]>()
    const [vehicles, setVehicles] = React.useState<Vehicle[]>()
    const [homeWorld, setHomeworld] = React.useState<HomeWorld>()

    React.useEffect(() => {
        if (person) {
            Axios.get(person.homeworld)
                .then(values => setHomeworld(values.data))

            Promise.all(person.films.map(url => Axios.get<Film>(url)))
                .then((values) => setFilms(values.map(resp => resp.data)))

            Promise.all(person.vehicles.map(url => Axios.get<Vehicle>(url)))
                .then((values) => setVehicles(values.map(resp => resp.data)))
        }
    }, [person])

    return (
        <Grid>
            <Header as="h2">{person?.name}</Header>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Name: ${person?.name}`}
                </Grid.Column>
                <Grid.Column width="4">
                    {`Birth Year: ${person?.birth_year}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Gender: ${person?.gender}`}
                </Grid.Column>
                <Grid.Column width="4">
                    {`Home World: ${homeWorld?.name || '...loading'}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Height (cm): ${person?.height}`}
                </Grid.Column>
                <Grid.Column width="4">
                    {`Weight (kg): ${person?.mass}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Hair Color: ${person?.hair_color}`}
                </Grid.Column>
                <Grid.Column width="4">
                    {`Skin Color: ${person?.skin_color}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Eye Color: ${person?.eye_color}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    <Films films={films} />
                </Grid.Column>
                <Grid.Column width="4">
                    <Vehicles vehicles={vehicles} />
                </Grid.Column>
                <Grid.Column width="4">
                    <Starships />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="2" >
                    <Button onClick={onBackSelected} fluid>Back</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const Films = ({ films }: { films?: Film[] }) => (
    <Segment loading={!!!films}>
        <Header as="h3">Films</Header>
        <List as='ul'>
            {films?.map((film, idx) => (<List.Item as='li' key={idx}>{film.title}</List.Item>))}
        </List>
    </Segment>
)


const Vehicles = ({ vehicles }: { vehicles?: Vehicle[] }) => (
    <Segment loading={!!!vehicles}>
        <Header as="h3">Vehicles</Header>
        <List as='ul'>
            {vehicles?.map((vehicle, idx) => (<List.Item as='li' key={idx}>{vehicle.name}</List.Item>))}
        </List>
    </Segment>
)

const Starships = () => (
    <Segment>
        <Header as="h3">Starships</Header>
        <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder>
    </Segment>
)

export default PersonDetails;