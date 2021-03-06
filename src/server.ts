import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from 'schema';

const app = express();

app.get('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(8080);