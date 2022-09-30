# Getting Started with ArgentBank !

This repos is all the source code to run the Argent bank webApp.

## Prerequisites

-   [NodeJS](https://nodejs.org/en/)
-   [NPM](https://www.npmjs.com/) and/or [Yarn](https://www.yarnpkg.com/)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community)
## Launch Back-end

-   Clone the repository of the [api](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API) on your computer.
-   Open a terminal window in the cloned project
-   Run the following commands:

```bash
# Install dependencies
npm install
# Start local dev server
npm run dev:server
# Populate database with two users
npm run populate-db
```

Your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!


### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

## Launch Front-end

-   Clone the repository of [front-end app](https://github.com/thxDuck/DylanPelle_13_072022) on your computer.

-   Open a terminal window in the cloned project
-   Run the following commands:

```bash
# Install dependencies
npm install
# Start local dev
npm start
```

Your server should now be running at http://locahost:3000


## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

<br>
<br>

# Post-project reflections

I was not completely satisfied with the correction requested by the mentor. 
In fact, there is already some requests, to get information, and the http verb used for requests is "POST".
But if we have to send the accountId or transactionId in a query param, these informations were visible in the url and it's not secure, especially for a banking API. With "POST" method, the parameters were hidden in the body.
So, in a real situation, I would go to the client’s security department to discuss with them the methods to use.