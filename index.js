require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const resolvers = require('./src/resolvers');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const mongo = mongoose.connection;

mongo.on('error', error => console.log(error))
    .once('open', () => console.log('Connected to Database! '));

const typeDefs = importSchema( __dirname + '/schema.graphql');

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log('Servidor arriba en puerto 4000'));