# **Express Shopping List**

## **Overview**

The main feature of this application is a simple JSON API application where we will store a shopping list.

## **Requirements**

The application should have the following routes:

1. GET /items - this should render a list of shopping items.

   > Here is what a response looks like: [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

2. POST /items - this route should accept JSON data and add it to the shopping list.

   > Here is what a sample request/response looks like: {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

3. GET /items/:name - this route should display a single item’s name and price.

   > Here is what a sample response looks like: {“name”: “popsicle”, “price”: 1.45}

4. PATCH /items/:name, this route should modify a single item’s name and/or price.

   > Here is what a sample request/response looks like: “name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

5. DELETE /items/:name - this route should allow you to delete a specific item from the array.
   > Here is what a sample response looks like: {message: “Deleted”}

## Technologies Used:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/4x/api.html)
- [Jest](https://jestjs.io)
- [Supertest](https://github.com/visionmedia/supertest)
- [Morgan](https://www.npmjs.com/package/morgan)
- [VSCode](https://code.visualstudio.com/docs)
