import { validate, ValidationError } from "class-validator";
import { Repository } from "typeorm/repository/Repository";
import { User } from "../entities/user.entity";

export class UserController {
	constructor(private userRepo: Repository<User>) {}

	public getUserByEmail = async (email: string): Promise<User | undefined> => {
		const user = await this.userRepo.findOne({ email });
		return user;
	};

	public getUserById = async (id: string): Promise<User | undefined> => {
		const user = await this.userRepo.findOne(id);
		return user;
	};

	public insertUser = async (user: User): Promise<User> => {
		try {
			const errors: ValidationError[] = await validate(user, { skipMissingProperties: true });
			if (errors.length > 0) {
				throw new Error(`Invalid ${errors[0].property}`);
			}

			const savedUser = await this.userRepo.save(user);
			return savedUser;
		} catch (error) {
			throw new Error(error);
		}
	};

	public updateUser = async (userId: string, rawUser: User): Promise<User> => {
		try {
			const errors: ValidationError[] = await validate(rawUser, { skipMissingProperties: true });
			if (errors.length > 0) {
				throw new Error(`Invalid ${errors[0].property}`);
			}

			const userToUpdate = await this.userRepo.findOne(userId);

			if (userToUpdate) {
				userToUpdate.firstName = rawUser.firstName;
				userToUpdate.lastName = rawUser.lastName;

				const updatedUser = await this.userRepo.save(userToUpdate);
				return updatedUser;
			}

			throw new Error("User not found");
		} catch (error) {
			throw new Error(error);
		}
	};
}
