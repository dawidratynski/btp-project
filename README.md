## Simple system for collecting stock quotes.

<br />

The server exposes a GraphQL API on port 3000 and database admin panel on port 5050. The database uses port 5432. 
Postgres and admin panel settings can be changed in .env file.

<br />

The API is described in the /src/schema.gql file.

When server is running in developement or watch mode you can experiment with the API in GraphQL playground (3000/graphql).

<br />

System data model is described in the data_model.pdf file.

<br />

## Setting up the database

```bash
# setup postgres and admin panel containers
$ docker-compose up

# turn off postgres and admin containers
$ docker-compose down

# turn off only the admin panel
$ docker kill btp_project_pgadmin4_container

# remove the database (warning: you will lose all data inside)
$ docker-compose down --volumes
```
<br />

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests (note: for some tests the database container has to be running)
$ npm run test
```