import { EventSubscriber } from "typeorm";
import { EntitySubscriberInterface } from "typeorm/subscriber/EntitySubscriberInterface";
import { InsertEvent } from "typeorm/subscriber/event/InsertEvent";
import { UpdateEvent } from "typeorm/subscriber/event/UpdateEvent";
import { User } from "../entities/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	public listenTo() {
		return User;
	}

	public async beforeInsert(event: InsertEvent<User>) {
		await event.entity.hashPassword();
	}

	public async beforeUpdate(event: UpdateEvent<User>) {
		const dbUser = event.databaseEntity;
		const updateUser = event.entity;
		const isPasswordMatch =
			dbUser.password === updateUser.password ||
			(await dbUser.comparePassword(updateUser.password));
		if (!isPasswordMatch) {
			await updateUser.hashPassword();
		}
	}
}
