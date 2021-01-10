const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

//import Apollo
const { ApolloServer } = require('apollo-server-express')
//import authentication
const { authMiddleware } = require('./utils/auth')
//import typeDefs and resolvers 
const { typeDefs, resolvers } = require('./schemas');


const app = express();
const PORT = process.env.PORT || 3001;

//create new apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

//integrate apollo server
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//catch all route - if user goes to undefined route send them to homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)

    //gql playground
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
  
});
