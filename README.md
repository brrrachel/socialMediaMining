# Social Media Mining

This repository hosts all data for the Social Media Seminar Project by Rachel Brabender, Oliver Clasen und Maximilian Götz.

## Base Requirements
First you have install [Node.js](https://nodejs.org/en/download/), Version v12.13.1 is necessary. Afterwards install always all dependencies by:
```
cd application && npm i
```

## Set Up Database
### For Mac/Linux
To use the database we build and filled you can run it in docker.
* First Go to docker-psql and unzip the postgres-volume-package.zip
* Then you need to install docker (if you not already have)
* Afterwards just start the postgres container with the shellscript ```startDockerDb.sh```
* The Database should now be up and running. To stop the database just run
```
docker stop pg-docker
```

### For Windows
Since docker and Windows don't really get along, we have to take the long way here.

For the database we are using postgres. 
We need to install Postgres via the windows installer from [here](https://www.postgresql.org/download/windows/).

You need PostgreSQL Server and Command Line Tools.
After that, just follow steps of the [README in the setup folder](setup/README.md)

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
