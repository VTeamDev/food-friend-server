import "reflect-metadata";
import * as Winston from "winston";
import { startServer } from "./server";

startServer().catch(error => {
	Winston.error(error);
});
