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
/api/v1/users/register?email=<YOUR-EMAIL>&password=<YOUR-PASSWORD>&password_confirmation=<YOUR-PASSWORD>
```

* 201 Response
```
"<YOUR-API-KEY>"
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
/api/v1/users?email=<YOUR-EMAIL>&password=<YOUR-PASSWORD>
```

* 201 Response
```
"<YOUR-API-KEY>"
```
* 401 Response
```
"Invalid credentials."
```

### Meal Endpoints

#### POST /api/v1/meals
* Request
```
/api/v1/meals?api_key=<YOUR-API-KEY>&meal_name=<MEAL-NAME>&date=<MEAL-DATE>
```

* 201 Response
```
{
    "id": "2",
    "message": "Breakfast has been added to meals for 5/12/19"
}
```
    
* 401 Response
```
{
    "error": "Invalid credentials"
}
```

#### GET /api/v1/meals
* Request
```
/api/v1/meals?api_key=<YOUR-API-KEY>
```

* 200 Response
```
{
    "user_id": "2",
    "meals": [
        {
            "Thu May 09 2019 00:00:00 GMT+0000 (Coordinated Universal Time)": [
                {
                    "id": 4,
                    "name": "Breakfast",
                    "date": "2019-05-09T00:00:00.000Z",
                    "foods": [
                        {
                            "id": 3,
                            "name": "Cupcake",
                            "calories": 450,
                            "createdAt": "2019-05-13T19:03:08.563Z",
                            "updatedAt": "2019-05-13T19:03:08.563Z"
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "Lunch",
                    "date": "2019-05-09T00:00:00.000Z",
                    "foods": [
                        {
                            "id": 2,
                            "name": "Egg",
                            "calories": 75,
                            "createdAt": "2019-05-13T19:03:08.563Z",
                            "updatedAt": "2019-05-13T19:03:08.563Z"
                        }
                    ]
                },
                {
                    "id": 6,
                    "name": "Dinner",
                    "date": "2019-05-09T00:00:00.000Z",
                    "foods": [
                        {
                            "id": 1,
                            "name": "Popcorn",
                            "calories": 105,
                            "createdAt": "2019-05-13T19:03:08.563Z",
                            "updatedAt": "2019-05-13T19:03:08.563Z"
                        }
                    ]
                }
            ]
        },
        {...},
        {...}
    ]
}
```

* 400 Response
```
{
    "error": "Could not fetch meals."
}
```

#### GET /api/v1/meals/:id
* Request
```
/api/v1/meals/1?api_key=<YOUR-API-KEY>
```

* 200 Response
```
{
    "id": "1",
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Popcorn",
            "calories": 105,
            "createdAt": "2019-05-15T19:16:15.154Z",
            "updatedAt": "2019-05-15T19:16:15.154Z"
        },
        {
            "id": 2,
            "name": "Egg",
            "calories": 75,
            "createdAt": "2019-05-15T19:16:15.154Z",
            "updatedAt": "2019-05-15T19:16:15.154Z"
        }
    ]
}
```

* 400 Response
```
{
    "error": Could not find meal."
}
```

### Food Endpoints

#### POST /api/v1/foods
* Request
```
/api/v1/foods?food_name=<FOOD-NAME>&calories=<CALORIES>
```

* 201 Response
```
{
    "id": 18,
    "name": "Cantaloupe",
    "calories": 100,
    "updatedAt": "2019-05-12T20:01:03.097Z",
    "createdAt": "2019-05-12T20:01:03.097Z"
}
```

* 400 Response
```
{
    "error": {<DB-ERROR>}
}
```

#### GET /api/v1/foods/all
* Request
```
/api/v1/foods/all
```

* 200 Response
```
[
    {
        "id": 1,
        "name": "Popcorn",
        "calories": 105,
        "createdAt": "2019-05-15T19:16:15.154Z",
        "updatedAt": "2019-05-15T19:16:15.154Z"
    },
    {
        "id": 2,
        "name": "Egg",
        "calories": 75,
        "createdAt": "2019-05-15T19:16:15.154Z",
        "updatedAt": "2019-05-15T19:16:15.154Z"
    },
    {
        "id": 3,
        "name": "Cupcake",
        "calories": 450,
        "createdAt": "2019-05-15T19:16:15.154Z",
        "updatedAt": "2019-05-15T19:16:15.154Z"
    },
    {...}
]
```

* 400 Response
```
{
    "error": {<DB-ERROR>}
}
```

#### GET /api/v1/foods
* Request
```
/api/v1/foods?food_name=<FOOD-NAME>
```

* 200 Response
```
{
    "id": 1,
    "name": "Popcorn",
    "calories": 105,
    "createdAt": "2019-05-15T19:16:15.154Z",
    "updatedAt": "2019-05-15T19:16:15.154Z"
}
```

* 404 Response
```
{
    "error": {<DB-ERROR>}
}
```

#### PUT /api/v1/foods
* Request
```
{
    "food_name": "Popcorn",
    "calories": 200
}
```

* 200 Response
```
{
    "id": 1,
    "name": "Popcorn",
    "calories": 200,
    "createdAt": "2019-05-15T19:16:15.154Z",
    "updatedAt": "2019-05-15T19:18:32.046Z"
}
```

* 404 Response
```
{
    "error": {<DB-ERROR>}
}
```

#### DELETE /api/v1/foods/:id
* 200 Response
```
{
    "message": "Popcorn has been deleted."
}
```

* 404 Response
```
{
    "error": {<DB-ERROR>}
}
```

### Meal Food Endpoints

#### POST /api/v1/meal-foods
* Request
```
/api/v1/meal-foods?api_key=<YOUR-API-KEY>&date=5/15/19&meal_name=Snack&food_name=Popcorn
```

* 201 Response
```
{
    "message": "Popcorn has been added to Snack for 5/15/2019"
}
```

* 401 Response
```
{
    "error": "Invalid credentials."
}
```

#### DELETE /api/v1/meal-foods
* Request
```
https://choosin-foods.herokuapp.com/api/v1/meal-foods?userID=<USER-ID>&mealID=<MEAL-ID>&foodID=<FOOD-ID>
```

* 204 Reponse
```
"Record has been deleted."
```

* 404 Response
```
{
    "error": "Record could not be deleted."
}
```

## Contributors

* [Peregrine Balas](https://github.com/PeregrineReed)
* [April Dagonese](https://github.com/aprildagonese)
