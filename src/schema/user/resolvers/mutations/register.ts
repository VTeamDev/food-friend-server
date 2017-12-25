import { plainToClass } from "class-transformer";
import { User } from "../../../../connector/entities/user.entity";
import { IAppContext } from "../../../../server";

export interface IRegisterModel {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const register = async (
	_0: undefined,
	args: IRegisterModel,
	{ controllers: { userController } }: IAppContext,
): Promise<User> => {
	const dbUser: User | undefined = await userController.getUserByEmail(args.email);
	if (dbUser) {
		throw new Error("User is existed");
	}

	const newUser: User = plainToClass(User, args);
	const savedUser: User = await userController.insertUser(newUser);
	return savedUser;
};
