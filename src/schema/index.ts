import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { nodeField, GraphQLUserType } from "./nodes";

const GraphQLQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: GraphQLUserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
    },
    node: nodeField,
  }
});

const schema = new GraphQLSchema({
  query: GraphQLQueryType,
});

export default schema;