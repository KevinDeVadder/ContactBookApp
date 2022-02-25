# ContactBookApp
A contact book app built with Vue.js and Express.js / Django

# Roadmap
1. Create Express.js API - Done
2. Create Vue.js Frontend - WIP
3. Translate Express API into Django API - WIP

# Express.JS API Instructions

## Prerequisites
1. Have a MongoDB cluster in Atlas OR have MongoDB installed locally
2. After cloning the repo, add a .env file in the root folder of express-server, containing the following properties:
    - DB_URI - MongoDB Atlas URI or local MongoDB URI
    - NODE_ENV - Which can be set to either test / dev / productions
    - SECRET - Secret key used to encrypt JWT
3. Add a folder called logs in the root folder of express-server, in order for the logging to work properly

## Usage
1. Clone repo
2. cd into express-server
3. You can either do:
    - npm run dev - In order to use the server in a dev environment
    - npm run test - In order to unittest the app
4. Have fun!