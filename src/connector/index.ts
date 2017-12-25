import { Connection, createConnection } from "typeorm";
import { dbHost, dbName, dbPassword, dbPort, dbRunMigration, dbUsername, isProd } from "../config";

export const startConnection = async (): Promise<Connection> => {
	const connection = await createConnection({
		type: "postgres",
		host: dbHost,
		port: dbPort,
		username: dbUsername,
		password: dbPassword,
		database: dbName,
		entities: isProd ? [`${__dirname}/entities/*.js`] : [`${__dirname}/entities/*.ts`],
		subscribers: isProd ? [`${__dirname}/subscribers/*.js`] : [`${__dirname}/subscribers/*.ts`],
		logging: false,
		// TODO: Set to true to run the migration again
		synchronize: dbRunMigration,
		dropSchema: dbRunMigration,
		migrationsRun: dbRunMigration,
	});
	return connection;
};
