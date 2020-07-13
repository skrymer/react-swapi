import React from 'react'
import { Button, Container, Grid } from 'semantic-ui-react'

function App() {
  return (
    <Container style={{ marginTop: '3em' }}>
      <Grid columns={2} >
        <Grid.Column >
          <Button>Click Here</Button>
        </Grid.Column>
        <Grid.Column>
          Hello
        </Grid.Column>
        </Grid>
    </Container>
  );
}

export default App;
