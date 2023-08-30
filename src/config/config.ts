import dotenv from "dotenv";
import { IConfig } from "./config.interface";

export const getConfig = () => {
	dotenv.config();

	const ENV = process.env.ENV || "prod";
	const TOKEN = process.env.TOKEN;
	const ACCESSTOKEN = process.env.ACCESSTOKEN;
	const CHATID = process.env.CHATID;

	if (!TOKEN) {
		throw new Error("token not found");
	}

	if (!ACCESSTOKEN) {
		throw new Error("access token not found");
	}

	if (!CHATID) {
		throw new Error("chat id not found");
	}

	const config: IConfig = {
		ENV,
		TOKEN,
		ACCESSTOKEN: `Bearer ${ACCESSTOKEN}`,
		CHATID
	};

	return config;
};
