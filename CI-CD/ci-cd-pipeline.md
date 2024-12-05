## CI/CD Pipeline Considerations
This application needs a CI/CD pipeline to be built.  The recommended approach would be to utilize GitHub Actions which automatically kick off CI when a PR is created or a new branch is created.  It is integrated into the GitHub repo so is very convenient and relatively simple to get something up and running.

Consider the following steps in a CI pipeline.
- Triggered on PR creation (opened, reopened, synchronize) and merging to Main
- Integrate Build Failures/Successes with Slack to notify the team
1. Install (npm install)
2. Lint (npm run lint)
3. Run Unit Tests with coverage report (npm run test:cov)
4. Rename and Upload coverage Report
5. Run E2E Tests with coverage report (npm run test:e2e:cov)
6. Rename and Upload coverage Report
7. Run Sonar (use coverage reports as input)
8. Build Docker image and tag the image with Git commit SHA

Consider the following steps in a CD pipeline.
- Prerequisite - requires Kubernetes environment(s) to be setup (DEV, STAGE, PROD for example)
- Automatic - Only trigger CD when a PR is merged to the Main branch
- Automatic - Only trigger CD when the CI steps have successfully completed on the Main branch
- Automatic - Deploy the built (tagged) Docker image to the DEV environment
- Automatic - Run automated smoke tests in DEV to confirm the deployment was successful in DEV

- Automatic or Manual - Deploy the built (tagged) Docker image to the STAGE environment
  - Can be triggered when the smoke tests have run successfully in DEV
  - Can also be triggered by the dev team manually when they are ready to deploy to STAGE (ie triggered via a release branch)
- Automatic - Run automated smoke tests in STAGE to confirm the deployment was successful in STAGE

- Automatic or Manual - Deploy the built (tagged) Docker image to the PROD environment
  - Can be triggered when the smoke tests have run successfully in STAGE
  - Can also be triggered by the dev team manually when they are ready to deploy to PROD (ie triggered via a release branch)
- Automatic - Run automated smoke tests in PROD to confirm the deployment was successful in PROD