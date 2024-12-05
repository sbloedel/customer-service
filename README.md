
## Description

The customer-service application is a sample [Nest](https://github.com/nestjs/nest) framework application written in TypeScript.

It provides a basic CRUD API that reads and writes customer information stored in a Postgres database.

### Things to note
- Due to time constraints, there are limited unit tests.  We need to go back and cover some areas that were skipped including some of the CRUD operations and utility classes.
- Search for 'TODO:' in the code and you will see notes on areas that need further implementation consideration
- I added a basic Winston logger that can be used to send a JSON formatted log message to Sumologic or Logz.
- Authentication has not been implemented at this time.  It would need to be implemented before deploying to PROD.
- Need to consider Swagger documentation for this API which has not been done yet

## Prerequisites
Install [Docker](https://www.docker.com/)

## Project setup
```bash
$ npm install
```

## Start the local database, Prometheus and Grafana
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

## Connecting to Grafana
Prometheus and Grafana aren't quite configured correctly and I'm unfamiliar with getting it setup.
- Go to http://localhost:3001 in your browser
- username: admin, password: admin
- Go to Connections -> Data sources in the left nav
- Add a new 'prometheus' data source with a url of http://host.docker.internal:9090
- Go to Connections -> Data sources in the left nav
- Select prometheus
- Go to the Dashboards tab
- Import the sample dashboards (Prometheus Stats, Prometheus 2.0 Stats, Grafana metrics)
- Go to Dashboards in the left nav
- Select the dashboards that were just imported to see metrics

## Need Distributed Tracing
This project needs distributed tracing setup using OpenTelemetry or some other option.  It has not been implemented at this time

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
