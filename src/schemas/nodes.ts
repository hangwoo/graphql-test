import {
  connectionArgs,
  connectionDefinitions,
  nodeDefinitions,
  fromGlobalId,
  globalIdField, connectionFromArray,
} from 'graphql-relay';
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
    userId: {
      type: GraphQLString,
      resolve: (review: Review) => review.author.id,
    }
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: GraphQLReviewConnectionType,
  edgeType: GraphQLReviewEdgeType,
} = connectionDefinitions({
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
      type: GraphQLReviewConnectionType,
      args: connectionArgs,
      resolve: (user: User, { after, before, first, last }) => {
        return connectionFromArray([
          ...database.getReviews(user.id),
        ], {
          after,
          before,
          first,
          last,
        });
      },
    }
  },
  interfaces: [nodeInterface],
});

export { nodeField, GraphQLReviewType, GraphQLUserType, GraphQLReviewConnectionType, GraphQLReviewEdgeType };