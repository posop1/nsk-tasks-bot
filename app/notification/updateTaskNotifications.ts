import { Bot, Context, Api, RawApi } from "grammy";
import { config } from "../config/config";

export const updateTaskNotifications = (CHATID: string, bot: Bot<Context, Api<RawApi>>) => {
	const INTERVAL = +config.INTERVAL;
};
