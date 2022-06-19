## NextJS, NodeJs Rest API

Backend application is a REST API using NodeJS, PrismaORM

Frontend application is a NextJS, Ant Design, React source code in `./frontend/blog`

### REST API Documenatation

https://documenter.getpostman.com/view/2536760/UzBmN7Uu
Postman collection in: `./test/Blog.postman_collection.json`

### Authentication

The backend resources are protected with a Bearer token auth You can generate a token from `/auth/token`
with `email, password` in the body of the request

`The default password for the generated data is the user "email"`

### Start Backend App

- run `npm install`
- Update the `DATABASE_URL` in .env file to make it work with your mysql database name
- Apply the database migrations using `npx prisma db push`
- run the app using `npm run start_backend`
* The REST API is running on port 3200


### Start Frontend App

- Make sur you are in the folder `./frontend/blog`
- run `npm install`
- run the app using `npm run start_frontend`
* The REST API is running on port 3000


#### Warning for windows users

When starting the app on windows, you maybe need to adjust the paths in package.json -> scripts for the npm commands to
work properly