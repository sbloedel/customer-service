
## Description

The customer-service application is a sample [Nest](https://github.com/nestjs/nest) framework application written in TypeScript.

It provides a basic CRUD API that reads and writes customer information stored in a Postgres database.

### Things to note
- Due to time constraints, there are limited unit tests.  We need to go back and cover some areas that were skipped including some of the CRUD operations and utility classes.  Integration/Acceptance tests need a little work too.  There are some comments in the Testing section below on next steps.
- Search for 'TODO:' in the code and you will see notes on areas that need further implementation consideration
- I added a basic Winston logger that can be used to send a JSON formatted log message to Sumologic or Logz.
- Authentication has not been implemented at this time.  It would need to be implemented before deploying to PROD.
- Need to consider Swagger documentation for this API which has not been done yet and how can we integrate either a design first approach, or automatically generate the documentation as part of CI/CD.
- Exception Handling needs some further consideration.  We need to make sure that exceptions are sent to a monitoring tool like Sentry so the development team can be alerted when things go wrong.  We also need to make sure that repository specific errors don't leak into the Application (service) layer.  See TODO comments in code and consider ExceptionFilters
- Need to consider distributed tracing setup using OpenTelemetry or some other option.  It has not been implemented at this time.
- Due to time constraints, I did not implement a Kubernetes deployment at this time (STEP 5).  I know how to use kubectl to connect to deployed images and view logs, restart services, etc, and I know how to modify helm charts, but typically Kubernetes is setup for me in AWS.  I'm not familiar enough with running Kubernetes locally and deploying docker images to a local Kubernetes cluster.
- CI/CD Pipeline designs can be found [here](CI-CD/ci-cd-pipeline.md)

## Prerequisites
- Install [Docker](https://www.docker.com/)
- Install [Node](https://nodejs.org/en/download/package-manager).  Consider using [NVM](https://github.com/nvm-sh/nvm) to easily switch between Node versions.
- Install [MiniKube](https://minikube.sigs.k8s.io/docs/) to deploy to a locally running Kubernetes cluster

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

## Executing methods on the API via CLI (STEP 7)
```bash
#Creating a new customer
curl -X POST "http://localhost:3000/v1/customers" \
     -H "Content-Type: application/json" \
     -d '{
           "firstName": "John",
           "middleName": "Doe",
           "lastName": "Smith",
           "emailAddress": "john.smith@example.com",
           "phoneNumber": "5035551212"
         }'

#Fetching a customer
curl -X GET "http://localhost:3000/v1/customers?phoneNumber=(503)555-1212"

#Deleting a customer
curl -X DELETE "http://localhost:3000/v1/customers/{id}"
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

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
