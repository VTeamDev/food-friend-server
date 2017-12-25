import * as Jwt from "jsonwebtoken";
import { secretKey } from "../../../../config";
import { IAppContext, IAuthPayload } from "../../../../server";

export interface ILoginModel {
	email: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
	issuedAt: number;
	expiresIn: number;
}

export const login = async (
	_0: undefined,
	{ email, password }: ILoginModel,
	{ controllers: { userController } }: IAppContext,
): Promise<ILoginResponse> => {
	const loginUser = await userController.getUserByEmail(email);
	if (!loginUser) {
		throw new Error("Wrong email or password");
	}

	const isPasswordMatch = await loginUser.comparePassword(password);
	if (!isPasswordMatch) {
		throw new Error("Wrong email or password");
	}

	const payload: IAuthPayload = {
		id: loginUser.id,
	};
	const token = Jwt.sign(payload, secretKey, {
		expiresIn: "30d",
	});

	const currentTime = Math.floor(Date.now() / 1000);

	return {
		token: `Bearer ${token}`,
		expiresIn: currentTime + 24 * 3600 * 30,
		issuedAt: currentTime,
	};
};
