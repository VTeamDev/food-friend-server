import { Connection, createConnection } from "typeorm";

export const startConnection = async (): Promise<Connection> => {
	const connection = await createConnection();
	return connection;
};
