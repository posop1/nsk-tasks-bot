import dotenv from "dotenv";
import { IConfig } from "./config.interface";

export const getConfig = () => {
	dotenv.config();

	const APP_URL = process.env.APP_URL;
	const ENV = process.env.ENV || "prod";
	const TOKEN = process.env.TOKEN;
	const ACCESSTOKEN = process.env.ACCESSTOKEN;
	const CHATID = process.env.CHATID;
	const INTERVAL = process.env.INTERVAL;

	if (!APP_URL) {
		throw new Error("app url not found");
	}

	if (!TOKEN) {
		throw new Error("token not found");
	}

	if (!ACCESSTOKEN) {
		throw new Error("access token not found");
	}

	if (!CHATID) {
		throw new Error("chat id not found");
	}

	if (!INTERVAL) {
		throw new Error("interval not found");
	}

	const config: IConfig = {
		APP_URL,
		ENV,
		TOKEN,
		ACCESSTOKEN: `Bearer ${ACCESSTOKEN}`,
		CHATID,
		INTERVAL
	};

	return config;
};

export const config = getConfig();
