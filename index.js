const { ApolloServer } = require('apollo-server');
// const gql = require('graphql-tag');
const mongoose = require('mongoose');

// const Post = require('./models/Post'); Now we call our index.js that has all the resolvers.
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
const dotenv = require("dotenv");
dotenv.config();

//typeDefs were originally here, now they're in their own file.
const typeDefs = require('./graphql/typeDefs');

//resolvers were originally here, now they're in their own file.


const server = new ApolloServer({
    typeDefs,
    resolvers,
    //Line Below takes the Req Body and forward it to the Context, now we can use the Req Body in Context
    context: ({ req }) => ({ req})
    //To the line above, we LATER ON added pubsub to the context
});

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected. :D")
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });




