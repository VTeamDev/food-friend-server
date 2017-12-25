# Food friend server

Server project for Food Friend app

## What do you need

* Postgres server
* NodeJS 8.9.0 or newer
* Yarn 1.3.2 or newer

## Instruction

* Clone this project
* Run `cp .env.example .env`
* To start the dev server, run `yarn dev`
* Open `http://localhost:8080/graphiql` to test the GraphQL endpoint
* Install [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en) to modify headers

## Documentation :blue_book:

* Run the server with `yarn dev`
* Run the command `docgen` to generate doc in folder `doc`
* Open `doc/index.html` to view the documentation

## Generate Schema file :fire:

* Run the server with `yarn dev`
* Run `yarn codegen` to generate `schema.json` file
* You can now use this file in client with [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql) to make sure you are doing the right thing :smile:

## Note :pencil2:

* Auth header will be alive for 30 days, after that, you have to login again.