import { plainToClass } from "class-transformer";
import { User } from "../../../../connector/entities/user.entity";
import { IAppContext } from "../../../../server";

export interface IUpdateMeModel {
	firstName: string;
	lastName: string;
}

export const updateMe = async (
	_0: undefined,
	data: IUpdateMeModel,
	{ user, controllers: { userController } }: IAppContext,
) => {
	if (!user) {
		throw new Error("unauthorized");
	}

	const userUpdateBody = plainToClass(User, data);
	const updatedUser = await userController.updateUser(user.id, userUpdateBody);
	return updatedUser;
};
