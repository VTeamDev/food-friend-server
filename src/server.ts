import * as BodyParser from "body-parser";
import * as Cors from "cors";
import * as Express from "express";
import * as Helmet from "helmet";
import * as Jwt from "jsonwebtoken";
import * as Winston from "winston";

import { graphiqlConnect, graphqlExpress } from "apollo-server-express";
import { plainToClass } from "class-transformer";
import { NextFunction, Request } from "express";

import { port, secretKey } from "./config";
import { UserController } from "./connector/controllers/user.controller";
import { User } from "./connector/entities/user.entity";
import { startConnection } from "./connector/index";
import { schema } from "./schema/index";

export class IAuthPayload {
	public id: string;
}

export interface IAppControllers {
	userController: UserController;
}

export interface IAppContext {
	controllers: IAppControllers;
	user?: User;
}

export const startServer = async () => {
	const app = Express();

	// Connect to Database
	const connection = await startConnection();

	const userRepo = connection.getRepository(User);
	const userController = new UserController(userRepo);

	// Config app middleware
	app.use(Helmet());
	app.use(Cors());

	const authenticate = async (req: Request & { user?: User }, _: {}, next: NextFunction) => {
		try {
			const authorizationHeader = req.header("authorization");
			if (authorizationHeader && authorizationHeader.split(" ")[0] === "Bearer") {
				const token = authorizationHeader.split(" ")[1];
				const payload: IAuthPayload = plainToClass(IAuthPayload, Jwt.verify(token, secretKey));
				const { id } = payload;
				const user = await userRepo.findOne(id);
				if (user) {
					req.user = user;
					return next();
				}
			}
			return next();
		} catch (error) {
			return next();
		}
	};

	app.use(authenticate);

	app.use(
		"/graphql",
		BodyParser.json(),
		graphqlExpress((req?: Request & { user?: User }) => {
			const context: IAppContext = {
				user: req && req.user,
				controllers: {
					userController,
				},
			};
			return {
				schema,
				context,
			};
		}),
	);

	app.use(
		"/graphiql",
		graphiqlConnect({
			endpointURL: "/graphql",
		}),
	);

	return app.listen(port, () => {
		Winston.info(`Listening on port ${port}`);
	});
};
