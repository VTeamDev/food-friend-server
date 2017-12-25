import { IAppContext } from "../../../../server";

export const me = (_0: undefined, _: {}, context: IAppContext) => {
	return context.user;
};
