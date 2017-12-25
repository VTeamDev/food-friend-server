import { login, register } from "./mutations/index";
import { me } from "./queries/index";

export const userResolvers = {
	Query: { me },
	Mutation: {
		login,
		register,
	},
};
