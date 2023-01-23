require('dot-env').config;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mongoURI = process.env.DB_URI;  //'mongodb://localhost:27017/mailbox_db';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connected', console.log.bind(console, 'Connected to database'));

const resolvers = require('./resolvers');

// Load schema = the file
const schema = loadSchemaSync(path.join(__dirname, './graphql/schema.gql'), {
    loaders: [new GraphQLFileLoader()]
});

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

const app = express();
const PORT = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

app.use(
    graphqlHTTP({
        schema: schemaWithResolvers,
        graphiql: false
    })
)

module.exports = app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
