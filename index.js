const dontenv = require('dotenv');
dontenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema')
const cookieParser = require('cookie-parser');
const { authenticate } = require('./src/middleware/auth');

// Exectue the connectDB function to connect to our database
connectDB();

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))

app.use(cookieParser());

app.use(authenticate);

app.set('view engine', 'ejs');
// Update the location of the folder for res.render to use (default is './views')
app.set('views', path.join(__dirname, 'src/templates/views'));

// Set up middleware to parse form data and add body property to the request
app.use(express.urlencoded( { extended: true }))

// Import the function from the routes module
const initRoutes = require('./src/routes');
// Execute the function with the app as an argument
initRoutes(app);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
