import * as Dotenv from "dotenv";

Dotenv.config();

export const isProd = process.env.NODE_ENV === "production";

// Config for app
export const port = parseInt(process.env.PORT || "8080", 10);

// Config for DB
export const dbHost = process.env.DB_HOST || "localhost";
export const dbPort = parseInt(process.env.DB_PORT || "5432", 10);
export const dbUsername = process.env.DB_USER || "postgres";
export const dbPassword = process.env.DB_PASSWORD || "Abc123@@";
export const dbName = process.env.DB_NAME || "my-book-list";

// Configs for JWT
export const secretKey = process.env.JWT_SECRET_KEY || "";
