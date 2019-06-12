# quantified-self

A microservice built as a housing for account info and user login/logout for a project at [Turing School of Software & Design](turing.io). The project, sharing the same name, was an exercise in SOA requiring use of Node and Express. Users are able to log and track meals and the calories associated with those meals.

Along with the code found in this repository, the application's [production](https://quantifiedselfapp.herokuapp.com) utilizes another Express.js service for suggested [recipes](https://github.com/aprildagonese/qs_recipe_service) to users and a React [frontend](https://github.com/aprildagonese/qs_frontend) for UI/UX.

### Versions
* npm - 6.9.0
* Node - v11.14.0
* Express - 4.16.0
* psql (PostgreSQL) 11.3

## Setup and Installation

Fork and clone this repository

Run the following commands in your terminal:
```
$ npm install
$ npx sequelize db:create
$ npx sequelize db:migrate
$ touch .env
```
In the newly created .env file add a key for the recipes service
instructions for that service can be found [here](https://github.com/aprildagonese/qs_recipe_service).
```
RECIPE_KEY=<YOUR RECIPE KEY>
```

## API Endpoints

### User Endpoints

#### POST /api/v1/users/register
* Request
```
/api/v1/users/register?email=<your-email>&password=<your-password>&password_confirmation=<your-password>
```

* 201 Response
```
"<your-api-key>"
```
* 401 Response
```
"Invalid credentials."
```
* 500 Response
```
"User not created"
```

#### POST /api/v1/users
* Request
```
/api/v1/users?email=<your-email>&password=<your-password>
```

* 201 Response
```
"<your-api-key>"
```
* 401 Response
```
"Invalid credentials."
```

### Meal Endpoints

#### POST /api/v1/meals

#### GET /api/v1/meals

#### GET /api/v1/meals/:id

### Food Endpoints

#### POST /api/v1/foods

#### GET /api/v1/foods/all

#### GET /api/v1/foods

#### PUT /api/v1/foods

#### DELETE /api/v1/foods/:id

### Meal Food Endpoints

#### POST /api/v1/meal-foods

#### DELETE /api/v1/meal-foods

## Contributors

* [Peregrine Balas](https://github.com/PeregrineReed)
* [April Dagonese](https://github.com/aprildagonese)
