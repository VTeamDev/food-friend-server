var isProd = process.env.NODE_ENV === "production";

module.exports = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "Abc123@@",
	database: "food-friend-dev",
	entities: isProd ? [`build/connector/entities/*.js`] : [`src/connector/entities/*.ts`],
	subscribers: isProd ? [`build/connector/subscribers/*.js`] : [`src/connector/subscribers/*.ts`],
	migrations: [`src/migrations/*.ts`],
	cli: {
		migrationsDir: `src/migrations`,
	},
};
