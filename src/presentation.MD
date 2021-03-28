What is GraphQL trying solve and how is it different from REST

Show differences using swapi onlie REST/GraphQL api

Get the director for each of the films luke skywalker has been in and the names off all the starships luke skywalker has piloted.

Using REST

https://swapi.dev/

first get luke skywalker
curl https://swapi.dev/api/people/1/ | jq


then get each film to get the directors name
curl https://swapi.dev/api/films/1/ | jq
.
.
.

then get each starship to get names
curl https://swapi.dev/api/starships/12/ | jq
.
.
.

Using graphQL

https://graphql.org/swapi-graphql

{
  person(personID: 1) {
    name
    filmConnection {
      films {
        title
        director
      }
    }
    starshipConnection {
      starships {
        name
      }
    }
  } 
}

Apollo queries - https://www.apollographql.com/docs/react/data/queries/