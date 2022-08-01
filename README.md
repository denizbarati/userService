# userService
The project is based on NestJs, which the user creates and verifies

# instructions to run the project
## 1. Switch to branch develop to get the latest changes
## 2. Add an environment file to the project
Add a .env file in the api folder (at the top of your api folder, so nest can find it)
- add your own DATABASE_URL in the .env file
- add your own JWT_SECRET in the .env file

add your own DATABASE_URL in the .env file
add your own JWT_SECRET in the .env file

Database:  
You can use the free database from www.elephantsql.com

Example of file:

    DATABASE_URL=<your url>  
    JWT_SECRET=jklasjdoij897231na

## Start the Backend in dev Mode after you added the .env file
`npm install`  
`npm run start:dev`  


## Start the Backend in dev Mode With Docker
`login in` https://hub.docker.com  
`run docker build -t {Image Name} .`  
`run the image with this command : **_docker run -p port:port -d --name {container name} {image name}**_ `

If you have any questions, you can contact me via email: fatemehbaratit@gmail.com