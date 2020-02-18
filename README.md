# Social Media Mining

This repository hosts all data for the Social Media Seminar Project by Rachel Brabender, Oliver Clasen und Maximilian Götz.

## Base Requirements
First you have install [Node.js](https://nodejs.org/en/download/), Version v12.13.1 is necessary. Afterwards install always all dependencies by:
```
cd application && npm i
```

## Set Up Database
For the database we are using postgres. Therefore install it in order to run 
```
cd setup && sh setupDB.sh
```
to setup the database.
For reset the database just call:
```
cd setup && sh dropDB.sh
```

## Application
To find the underlying code of our application just move into the folder by:
```
cd application
```


## Data
Move into the data folder by `cd tweets`. There you find all collected tweets and the translations. Read the Readme there to get more details about it.


## Backend
For the backend to run, you have to start the server. 
```
cd backend
npm run build
npm run start
```
After every change you have to stop the server and run the build and start command again.
The server runs on port 3000. For communication with the backend use the Access-Service in 
```
application/src/app/services/access.service.ts
```
