import { IDirectiveResolvers, NextResolverFn } from "graphql-tools/dist/Interfaces";
import { IAppContext } from "../../server";

export interface IAuthDirectiveModel {
	guest: boolean;
}

export const directiveResolvers: IDirectiveResolvers<{}, IAppContext> = {
	auth: (next: NextResolverFn, _0: {}, args: { [argName: string]: any }, context: IAppContext) => {
		const localArgs = args as IAuthDirectiveModel;

		if (localArgs.guest) {
			if (context.user) {
				throw new Error("logout-first");
			}
			return next();
		}

		if (context.user) {
			return next();
		}
		throw new Error("unauthorized");
	},
};
