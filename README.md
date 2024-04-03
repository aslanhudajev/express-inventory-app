# Express Inventory Application

## Description

This is a simple fullstack inventory application made usingapplicationusing express.js.
This application was created for an assignment in TOP's NodeJS path.

## The stack

- Backend: Express.JS
- Database: MongoDB
- View engine: PUG
- Styling: TailwindCSS
- File upload: Multer
- Image store: Cloudinary
- Other middleware: Helmet, express-rate-limiter and express-validator

## What I learned

- The MVC model and the importance of encapsulation when programming a backend server.
- Containerization, with dockerfiles and docker compose (to some extent).
- How the HTTP request cycle works.
- How to write asynchronous middleware functions.

## Instructions

To set this project up yourself, and try it out you have to:

1. Clone the repo with `git clone`.
2. Run `npm install` to install all dependencies.
3. Create an `.env` file
4. Create the following environment variables in the `.env` file:
   - `MDB_CONNECTION_STR` <- This environment variable needs to be set to your MongoDB connection string.
   - `DB_NAME` <- This envrionment variable should needs to be set to your specific MongoDB database name.
   - `CLOUDINARY_URL` <- This envrionment variable should needs to be set to your Cloudinary connection string.
5. Finally you need to run `npm run dev` (development, with nodemon) or `npm run start` (production, with node).

Feel free to improve the application's styling and send me you results [@aslanhud on twitter](https://twitter.com/aslanhud) ⭐.
