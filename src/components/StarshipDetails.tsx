import { gql, useLazyQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Dimmer, Grid, Header, List, Loader, Segment } from 'semantic-ui-react';
import { StarshipQL } from '../models/Starship';

const FIND_BY_ID = gql`
query FindById($starshipId: ID) {
    starship(starshipID: $starshipId) {
        name
        crew
        passengers
        costInCredits
        starshipClass
        manufacturers
        maxAtmospheringSpeed
        length
        hyperdriveRating
        cargoCapacity
        consumables        
        filmConnection {
            films {
                title
				releaseDate
            }
        }
        pilotConnection {
			pilots {
                name
            }
        }
    }
}  
`;

const StarshipDetails: React.FC = () => {
    const [getStarship, { loading, error, data }] = useLazyQuery<{ starship: StarshipQL }>(FIND_BY_ID);
    const { id } = useParams<{ id: string }>()

    React.useEffect(() => {
        if (id) {
            getStarship({ variables: { starshipId: id } })
        }
    }, [id])

    return (
        <Grid style={{ marginTop: '3em' }}>
            {loading &&
                <Dimmer active  >
                    <Loader indeterminate>Loading...</Loader>
                </Dimmer>
            }
            <Header as="h2">{data?.starship.name}</Header>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Name: ${data?.starship.name}`}
                </Grid.Column>
                <Grid.Column width="4">
                    {`Cost in credits: ${data?.starship.costInCredits}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Crew: ${data?.starship.crew}`}
                </Grid.Column>
                <Grid.Column width="4">
                    {`Passengers: ${data?.starship.passengers}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Starship class: ${data?.starship.starshipClass}`}
                </Grid.Column>
                <Grid.Column width="8">
                    {`Manufacturers: ${data?.starship.manufacturers}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Max speed: ${data?.starship.maxAtmospheringSpeed}`}
                </Grid.Column>
                <Grid.Column width="8">
                    {`Length: ${data?.starship.length} meters`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Hyper drive rating: ${data?.starship.hyperdriveRating}`}
                </Grid.Column>
                <Grid.Column width="8">
                    {`Cargo capacity: ${data?.starship.cargoCapacity}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4">
                    {`Consumables: ${data?.starship.consumables}`}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="5">
                    <Segment>
                        <Header as="h3">Films</Header>
                        <List as='ul'>
                            {data?.starship?.filmConnection.films?.map((film, idx) => (<List.Item as='li' key={idx}>{`${film.title} - ${film.releaseDate}`}</List.Item>))}
                        </List>
                    </Segment>
                </Grid.Column>
                <Grid.Column width="5">
                    <Segment>
                        <Header as="h3">Pilots</Header>
                        <List as='ul'>
                            {data?.starship?.pilotConnection.pilots?.map((pilot, idx) => (<List.Item as='li' key={idx}>{pilot.name}</List.Item>))}
                        </List>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <pre style={{color: 'red'}}>{JSON.stringify(error, null, 2)}</pre>
        </Grid>
    );
};

export default StarshipDetails;