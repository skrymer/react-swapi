import * as React from 'react';
import { Grid, Input, Divider, Header, Button } from 'semantic-ui-react';
import { Person as PersonModel } from '../models/Person';
import { HomeWorld } from '../models/HomeWorld';

interface Props {
    person: PersonModel
    homeWorld?: HomeWorld
    films: string[]
}

const Person: React.FC<Props> = (props) => {
    return (
        <Grid>
            <Header as="h2">Person</Header>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input input="sonni" label="Name" disabled fluid />
                </Grid.Column>
                <Grid.Column width="6">
                    <Input value="Sonni" label="Birth Year" disabled fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input input="sonni" label="gender" disabled fluid />
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value="height" label="Height" disabled fluid />
                </Grid.Column>
                <Grid.Column width="6">
                    <Input value="Sonni" label="Weight" disabled fluid />
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value="height" label="Hair Color" disabled fluid />
                </Grid.Column>
                <Grid.Column width="6">
                    <Input value="Sonni" label="Skin Color" disabled fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value="Sonni" label="Eye Color" disabled fluid />
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
                <Grid.Column width="6">
                    <Input value={props.homeWorld} label="Home World" disabled fluid />
                </Grid.Column>
            </Grid.Row>
            <Button primary>Back</Button>            
        </Grid>
    );
};

export default Person;