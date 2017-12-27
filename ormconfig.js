require("dotenv").config();

var isProd = process.env.NODE_ENV === "production";

module.exports = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PASSWORD, 10),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: isProd ? [`build/connector/entities/*.js`] : [`src/connector/entities/*.ts`],
	subscribers: isProd ? [`build/connector/subscribers/*.js`] : [`src/connector/subscribers/*.ts`],
	migrations: [`src/migrations/*.ts`],
	cli: {
		migrationsDir: `src/migrations`,
	},
};
