import { nodeDefinitions, fromGlobalId, globalIdField } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import database, { Review, User } from 'db';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case "User":
        return database.getUser(id);
      case "Review":
        return database.getReview(id);
      default:
        throw new Error('invalid Type');
    }
  },
  // @ts-ignore
  obj => {
    if (obj instanceof User) {
      return GraphQLUserType;
    }
    if (obj instanceof Review) {
      return GraphQLReviewType;
    }
    return null;
  },
);

// @ts-ignore
const GraphQLUserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    // @ts-ignore
    id: globalIdField("User"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user: User) => user.name,
    },
  },
  interfaces: [nodeInterface],
});

const GraphQLReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: {},
});
