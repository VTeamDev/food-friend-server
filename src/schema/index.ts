import * as GraphQLDate from "graphql-date";
import { makeExecutableSchema } from "graphql-tools";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { directiveResolvers } from "./directives/index";
import { userResolvers, userTypes } from "./user/index";

const globalTypes = `
	directive @auth(guest: Boolean) on FIELD
	scalar Date
`;
const typeDefs = [globalTypes, userTypes];

const resolvers = {
	Date: GraphQLDate,
	Query: {
		...userResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
	},
} as IResolvers;

export const schema = makeExecutableSchema({
	typeDefs: [...typeDefs],
	resolvers,
	directiveResolvers,
});
