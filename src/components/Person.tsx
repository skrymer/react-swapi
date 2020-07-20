import * as React from 'react';
import { Button, Grid, Header, Input, List } from 'semantic-ui-react';
import { Film } from '../models/Film';
import { HomeWorld } from '../models/HomeWorld';
import { Person as PersonModel } from '../models/Person';

interface Props {
    person: PersonModel
    homeWorld?: HomeWorld
    films: Film[]
    onBack: () => void
}

const Person: React.FC<Props> = (props) => {
    return (
        <Grid>
            <Header as="h2">{props.person.name}</Header>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.person.name} label="Name"  fluid />
                </Grid.Column>
                <Grid.Column width="6">
                    <Input value={props.person.birth_year} label="Birth Year"  fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.person.gender} label="gender"  fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.person.height} label="Height (cm)"  fluid />
                </Grid.Column>
                <Grid.Column width="6">
                    <Input value={props.person.mass} label="Weight (kg)"  fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.person.hair_color} label="Hair Color"  fluid />
                </Grid.Column>
                <Grid.Column width="6">
                    <Input value={props.person.skin_color} label="Skin Color"  fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.person.eye_color} label="Eye Color"  fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.homeWorld?.name} label="Home World"  fluid />
                </Grid.Column>
            </Grid.Row>
            <Header as="h3">Films</Header>
            <Grid.Row>
                <Grid.Column width="6">
                    <List as='ul'>
                        {props.films.map((film, idx) => (<List.Item as='li' key={idx}>{film.title}</List.Item>))}
                    </List>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="2">
                    <Button onClick={props.onBack} primary fluid>Back</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Person;