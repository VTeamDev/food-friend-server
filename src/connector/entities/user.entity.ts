import { compare, genSalt, hash } from "bcrypt";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { PASSWORD_REGEX } from "../../helpers/constants";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid") public id: string;

	@IsString()
	@IsNotEmpty({ message: "First name is required" })
	@Column()
	public firstName: string;

	@IsString()
	@IsNotEmpty({ message: "Last name is required" })
	@Column()
	public lastName: string;

	@IsString()
	@IsNotEmpty({ message: "Email is required" })
	@IsEmail(undefined, { message: "Email is invalid" })
	@Column()
	@Index({
		unique: true,
	})
	public email: string;

	@IsString()
	@IsNotEmpty({ message: "Password is required" })
	@Matches(PASSWORD_REGEX, { message: "Password is invalid" })
	@Column()
	public password: string;

	@CreateDateColumn() public createdAt: Date;

	@UpdateDateColumn() public updatedAt: Date;

	public async hashPassword(): Promise<void> {
		const salt = await genSalt(12);
		this.password = await await hash(this.password, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		const result = await compare(password, this.password);
		return result;
	}
}
