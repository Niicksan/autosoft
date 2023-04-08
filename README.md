# AutoSoft is a platform for managing all the services done on your vehicles
# Web
## Download and Install Node.js

If you don't have Node.js installed, download it from here https://nodejs.org/en/download

Next in `/web` folder run 
### `npm install`

## Development server
Inside `/web` run `npm start` for a dev server. Navigate to http://localhost:3000. The application will automatically reload if you change any of the source files.

## Build
Build the app for production to the `build` folder.\
Run
### `npm run build`

## Routes


# REST-API - Server

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
| Delete vehicle   | /catalog/vehicles/:id      |       Yes      |
| My Profile       | /user/profile              |       Yes      |
| About us         | /about                     |       No       |
| Contact us       | /contacts                  |       No       |

## Download all dependencies while running this command
Navigate to `/server` folder and run `npm install` to install all dependencies

## tart server
Inside `/server` run `npm start` to start the API service on port 3030

## REST-API Endpoint
Base Url: https://localhost:3030/api

| HTTP Method |    Description   |      Endpoint     | Login Required |
| :---------- | :--------------  | :---------------- | :------------: |
|     POST    | Signing up       | /auth/register    |       No       |
|     POST    | Signing in       | /auth/login       |       No       |
|     POST    | Logging out      | /auth/logout      |       Yes      |
|     GET     | Your vehicle     | /vehicle/catalog  |       Yes      |
|     GEt     | Get pet          | /vehicle/:id      |       Yes      |
|     POST    | Create vehicle   | /vehicle/create   |       Yes      |
|     PATCH   | Update vehicle   | /vehicle/:id      |       Yes      |
|    DELETE   | Delete vehicle   | /vehicle/:id      |       Yes      |
|     GET     | My Profile info  | /user/user-info   |       Yes      |