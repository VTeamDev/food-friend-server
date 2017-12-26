import * as Dotenv from "dotenv";

Dotenv.config();

export const isProd = process.env.NODE_ENV === "production";

// Config for app
export const port = parseInt(process.env.PORT || "8080", 10);

// Configs for JWT
export const secretKey = process.env.JWT_SECRET_KEY || "";
