require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const verifyToken = require('./src/utils/verifyToken'); 
const AuthDirective = require('./src/resolvers/Directives/AuthResolver');
const resolvers = require('./src/resolvers');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const mongo = mongoose.connection;

mongo.on('error', error => console.log(error))
    .once('open', () => console.log('Connected to Database! '));

const typeDefs = importSchema( __dirname + '/schema.graphql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective,
    }
});

const server = new GraphQLServer({
    schema,
    context: async (contextParams) => ({
        ...contextParams,
        userAuth: contextParams.request // aquí viene nuestras cabeceras, nuestro body, nuestros params (en un axios trae el objeto request)
            ? await verifyToken(contextParams.request) // si si vienen, verificamos nuestro token, y le mandamos el request
            : {}, // si no viene voy a guardar un objeto vacio en el contexto
    }),
});

server.start( {port}, ( ) => console.log(`Servidor arriba en puerto ${ port }`)) ;