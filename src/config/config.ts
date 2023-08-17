import dotenv from "dotenv";
import { IConfig } from "./config.interface";

export const getConfig = () => {
	dotenv.config();

	const TOKEN = process.env.TOKEN;

	if (!TOKEN) {
		throw new Error("token not found");
	}

	const config: IConfig = {
		TOKEN
	};

	return config;
};
