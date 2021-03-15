import { connectionArgs, connectionDefinitions, nodeDefinitions, fromGlobalId, globalIdField } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import database, { Review, User } from 'db';

// @ts-expect-error
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

// @ts-expect-error
const GraphQLReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: {
    id: globalIdField("Review"),
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (review: Review) => review.description,
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: ReviewConnectionType, edgeType } = connectionDefinitions({
  name: "Review",
  nodeType: GraphQLReviewType,
});

// @ts-expect-error
const GraphQLUserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField("User"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user: User) => user.name,
    },
    reviews: {
      type: ReviewConnectionType,
      args: connectionArgs,
    }
  },
  interfaces: [nodeInterface],
});
