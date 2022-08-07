# userService
- The project is based on NestJs, which the user creates and verifies
- After creating a user, you can login and get the list of users and update or delete them if needed.
- After login, the token is returned to the user.
- The jwt service is used for tokenization.
- postgres database is used in this project

# instructions to run the project
## 1. Switch to branch develop to get the latest changes
## 2. Add an environment file to the project
Add a .env file in the api folder
- add your own dataBase config in the .env file
- add your own JWT_SECRET in the .env file


Database:  
if you have mac you can use pgAdmin4 for your db

Example of file:

    POSTGRES_HOST=<your host>  
    POSTGRES_USER=<your user>
    ...
    JWT_SECRET=jklasjdoij897231na

## Start the Backend in dev Mode after you added the .env file
`npm install`  

`npm run build`

`npm run start:dev`  

# Start the e2e tests 
`npm run test:e2e`

# Start the unit tests
`npm run test`

`npm run test:watch`

## Start the Backend in dev Mode With Docker
`login in` https://hub.docker.com

`run docker build -t {Image Name} .`  

`run the image with this command : docker run -p port:port -d --name {container name} {image name} `

If you have any questions, you can contact me via email: fatemehbaratit@gmail.com