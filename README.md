# Koa / Vue.js SPA Template App

This app is a template application using Koa for a REST/JSON API server and Vue.js for a web client.

![screen recording 2017-06-10 at 04 12 pm](https://user-images.githubusercontent.com/759811/27006360-bd3b8152-4df7-11e7-9011-f22204abe4d5.gif)

## Overview of Stack
- Server
  - Koa
  - PostgresSQL
  - [TypeORM](https://github.com/typeorm/typeorm) (data-mapper ORM)
  - [routing-controllers](https://github.com/pleerock/routing-controllers) (decorated, class-based controllers in Koa)
  - Docker used for development PostgresSQL database and MailCatcher server
- Client
  - Vue.js
  - Webpack for asset bundling and HMR (Hot Module Replacement)
  - CSS Modules
  - Fetch API for REST requests
- Testing
  - Mocha
  - MailCatcher for development email delivery
- DevOps
  - Ansible playbook for provisioning (Nginx reverse proxy, SSL via Let's Encrypt, PostgresSQL backups to S3)
  - Ansible playbook for deployment

## Development Setup

1. Install the following:
   - [Node.js >= v7.8.0](https://nodejs.org/en/download/)
   - [Ansible >= 2.3.1.0](http://docs.ansible.com/ansible/intro_installation.html) (`pip install ansible --upgrade` to upgrade)
   - [Docker](https://docs.docker.com/engine/installation/)
2. Run `npm install && npm start`
3. Open browser and navigate to [http://localhost:5000](http://localhost:5000).

## Scripts

### `npm install`

When first cloning the repo or adding new dependencies, run this command.  This will:

- Install Node dependencies from package.json

### `npm start`

To start the app for development, run this command.  This will:

- Run `docker-compose up` to ensure the PostgreSQL and MailCatcher Docker images are up and running
- Run dotnet watch run which will build the app (if changed), watch for changes and start the web server on http://localhost:5000
- Run Webpack dev middleware with HMR

### `npm run migration:create [name]`

Creates a new migration file in api/db/migrations/.  Migrations will be run each time the app starts (controlled with api/config/default.yml:autoMigrationsRun)

### `npm test`

This will run the tests.

### `npm run provision:production`

 _Before running this script, you need to create an ops/config.yml file first.  See the [ops README](ops/) for instructions._

 This will run the ops/provision.yml Ansible playbook and provision hosts in ops/hosts inventory file.  This prepares the hosts to recieve deployments by doing the following:
  - Install Nginx
  - Generate a SSL certificate from [Let's Encrypt](https://letsencrypt.org/) and configure Nginx to use it
  - Install Node.js
  - Install Supervisor (will run/manage the Node.js/Koa app)
  - Install PostgreSQL
  - Setup a cron job to automatically backup the PostgresSQL database, compress it, and upload it to S3.
  - Setup UFW (firewall) to lock everything down except inbound SSH and web traffic
  - Create a deploy user, directory for deployments and configure Nginx to serve from this directory

### `npm run deploy:production`

_Before running this script, you need to create a ops/config.yml file first.  See the [ops README](ops/) for instructions._

This script will:
 - Build release Webpack bundles
 - Package the Koa application
 - Run the ops/deploy.yml Ansible playbook to deploy this app to hosts in /ops/config.yml inventory file.  This does the following:
  - Copies the build assets to the remote host(s)
  - Creates config/local-production.yml the `appsettings.json` file with PostgresSQL credentials specified in ops/hosts file and the app URL (needed for JWT tokens)
  - Restarts the app so that changes will be picked up

## Development Email Delivery

This template includes a [MailCatcher](https://mailcatcher.me/) Docker image so that when email is sent during development (i.e. new user registration), it can be viewed
in the MailCacher web interface at [http://localhost:1080/](http://localhost:1080/).

## Visual Studio Code config

This project has [Visual Studio Code](https://code.visualstudio.com/) tasks and debugger launch config located in .vscode/.

### Tasks

- **Command+Shift+B** - Runs the "build" task which builds the api/ project and outputs to api/build/
- **Command+Shift+T** - Runs the "test" task which runs the tests.

### Debug Launcher

With the following debugger launch configs, you can set breakpoints in api/ or the the Mocha tests in client-web.test/ and have full debugging support.

- **Debug api/ (server)** - Runs the vscode debugger (breakpoints) on the api/ Node.js/Koa app
- **Debug client-web.test/ (Mocha tests)** - Runs the vscode debugger on the client-web.test/ Mocha tests
