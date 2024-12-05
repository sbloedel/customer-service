
## Description

The customer-service application is a sample [Nest](https://github.com/nestjs/nest) framework application written in TypeScript.

It provides a basic CRUD API that reads and writes customer information stored in a Postgres database.

### Things to note
- Due to time constraints, there are limited unit tests.  We need to go back and cover some areas that were skipped including some of the CRUD operations and utility classes.
- Search for 'TODO:' in the code and you will see notes on areas that need further implementation consideration
- I added a basic Winston logger that can be used to send a JSON formatted log message to Sumologic or Logz.

## Prerequisites
Install [Docker](https://www.docker.com/)

## Project setup
```bash
$ npm install
```

## Start the local database
```bash
$ docker-compose up
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests
There are unit tests and integration (e2e) tests as part of this project.

The e2e tests aren't quite where they need to be.  I struggled to be able to connect to the database to make sure the data is clean between tests.  Here's what is left to consider:
1. Refactor so that each test is isolated, reproducible and could be parallelized if needed.  This includes making sure the data is clean between tests.
2. Make sure to add a step in the CI/CD pipeline to run the e2e test suite.  We need to ensure the CI/CD pipleline fails if the e2e tests fail.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Connecting to the database (Optional)
If you want to connect to the psql database running in Docker, you'll need to install psql or a database UI client like [DBeaver](https://dbeaver.io/download/).  

Here is how to install PSQL:
```bash
#Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

#Install PostgreSQL
brew install postgresql
```

One psql is installed, you can connect to the database
```bash
psql -h localhost -p 5432 -U postgres -d postgres
# Enter password of 'pass123'
```
Once connected, you can run queries
```bash
# Query all customer records
select * from public.customers;

# Clear all customer records
truncate public.customers;
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
