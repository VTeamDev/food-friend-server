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
				// TODO: Handle errors here
				// tslint:disable-next-line:no-console
				console.log(errors);
				throw new Error("Error");
			}

			const savedUser = await this.userRepo.save(user);
			return savedUser;
		} catch (error) {
			throw new Error(error);
		}
	};
}
