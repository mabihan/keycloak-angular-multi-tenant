# 🔐 Keycloak Angular Multi-Tenants Example

This example projects demonstrates a multi-tenants setup of Keycloak Angular together with an actual Keycloak server . 
It can be used for testing and development purposes as well as a guideline on how to use Keycloak Angular in your own 
projects. **This project has been created from the example given in the 
[keycloak-angular repo](https://github.com/mauriciovigolo/keycloak-angular/tree/master/example) from 
[mauriciovigolo](https://github.com/mauriciovigolo/)**.

To run this project make sure you have [Angular CLI](https://cli.angular.io/) and 
[Docker](https://www.docker.com/) installed on your system.

# Running the application

## Keycloak server setup
To start the Keycloak server run `docker-compose up` in the same directory as this README file.
You can administrate the Keycloak server by navigating to http://localhost:8080/. The default username and password will 
both be `admin`. 

## Importing the realms and clients
Once the Keycloak server is up and running, you can import the 3 realms using the exports files available in the `/data`
folder : `realm-export-fifi.json`, `realm-export-loulou.json`, `realm-export-riri.json` :

1. Authenticate as admin on http://localhost:8080/ (`admin`/`admin`)
2. Manage > Import > Select file
3. 

## Starting Angular frontend
you can start the client application by running the commands : 

````shell
yarn install
yarn start
````
Client will be available on http://localhost:4200/ just like any other Angular CLI application.
