# AutoSoft is a platform for managing all the services done on your vehicles
# Web
## Download and Install Node.js

If you don't have Node.js installed, download it from here https://nodejs.org/en/download

Next in `/web` folder run 
### `npm install`

## Add environmental variables
Create file `.env.local` in the main root folder `web`
Add this constants
`REACT_APP_API_URL=http://localhost:3030/api`
`REACT_APP_IMAGE_API=http://localhost:3030/static/images`

## Development server
Inside `/web` run `npm start` for a dev server. Navigate to http://localhost:3000. The application will automatically reload if you change any of the source files.

## Build
Build the app for production to the `build` folder.\
Run
### `npm run build`

## Routes

|   Description    |            Route           | Login Required |
| :--------------  | :------------------------- | :------------: |
| Register         | /auth/register             |       No       |
| Logging in       | /auth/login                |       No       |
| Logging out      | /auth/logout               |       Yes      |
| Home             | /                          |       No       |
| Your vehicles    | /catalog/vehicles          |       yes      |
| Create vehicle   | /vehicles/create           |       Yes      |
| Vehicle details  | /catalog/vehicles/:id      |       Yes      |
| Edit vehicle     | /catalog/vehicles/edit/:id |       Yes      |
| My Profile       | /user/profile              |       Yes      |
| About us         | /about                     |       No       |
| Contact us       | /contacts                  |       No       |

# REST-API - Server

## Download all dependencies while running this command
Navigate to `/server` folder and run `npm install` to install all dependencies

## Start server
Inside `/server` run `npm start` to start the API service on port 3030

## REST-API Endpoint
Base Url: https://localhost:3030/api

| HTTP Method |    Description   |                 Endpoint                  | Login Required |
| :---------- | :--------------- | :---------------------------------------- | :------------: |
|    POST     | Signing up       | /auth/register                            |       No       |
|    POST     | Signing in       | /auth/login                               |       No       |
|    POST     | Logging out      | /auth/logout                              |       Yes      |
|    GET      | Your vehicles    | /vehicles/                                |       Yes      |
|    POST     | Create vehicle   | /vehicles/                                |       Yes      |
|    GET      | Get vehicle      | /vehicles/:vehicleId                      |       Yes      |
|    PATCH    | Update vehicle   | /vehicles/:vehicleId                      |       Yes      |
|    DELETE   | Delete vehicle   | /vehicles/:vehicleId                      |       Yes      |
|    GET      | Get services     | /vehicles/:vehicleId/services             |       Yes      |
|    POST     | Create service   | /vehicles/:vehicleId/services             |       Yes      |
|    GET      | Get service      | /vehicles/:vehicleId/services/:serviceId  |       Yes      |
|    PATCH    | Update service   | /vehicles/:vehicleId/services/:serviceId  |       Yes      |
|    DELETE   | Delete service   | /vehicles/:vehicleId/services/:serviceId  |       Yes      |
|    GET      | My Profile info  | /user/user-info                           |       Yes      |
|    POST     | Send message     | /contacts                                 |       No       |