# WeTravel

A dockerized full stack app with a Nuxt frontend, Nest.js backend, and GraphQL.

## General info
The app lists travels, public and private, depening on the user role (or if is a guest). If you're logged in, and you have an admin role, you can CRUD travels, add/remove tours from them. Only when a travel is set to public, it can be seen by non admin users and guests.

Pages included are:
/
/login
/travels
/travels/:slug


## How to run

### USING DOCKER (RECOMMENDED)

Simply enough, just clone the repository, then build the image and start the container, using these commands:

- `cd wetravel`
- `docker compose up --build`

The app will start on port 80, on http://localhost/

### RUNNING EACH APP SEPARATELY
This will require you to have MongoDB running, or you can run one on a docker container with this command:

`docker run --name mongodb -d -p 27017:27017 mongo`.

After that:

- First run the server, by  running these commands:
  
  - `cd wetravel/backend`
  - `cp .env.example .env`
  - `yarn install`
  - `yarn run start:dev`
  
  The server will start on http://localhost:3000/

- Then run the Nuxt app by opening a new terminal and running these commands:

  - `cd wetravel/frontend`
  - `cp .env.example .env`
  - `yarn install`
  - `yarn dev`

  The Nuxt app will start on http://localhost:3001/


## SEEDING THE Database

After you run the app, if you chose to run it with Docker, you can seed the DB by going to http://localhost/api/seed on your browser. The Database will be populated after that with fake data to work with.

Otherwise, if you chose to run the apps separately, you can visit http://localhost:3000/seed instead.


## USERS

After you seed the DB, two users will be created, one with an ADMIN role, and the other with a USER role. They're as follows:

- ADMIN:

  -  email: `admin@example.com`
  -  password: `secret123`

- USER:

  -  email: `user@example.com`
  -  password: `secret123`


## Automated tests

I added some test cases for the  resolvers & services belonging to travels & users. You can run them with `yarn test`.