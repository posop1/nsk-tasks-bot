import { Bot, Context, Api, RawApi } from "grammy";
import { config } from "../config/config";
import { logger } from "../../libs/logger/logger";

export const updateTaskNotifications = (CHATID: string, bot: Bot<Context, Api<RawApi>>) => {
	const INTERVAL = +config.INTERVAL;
	logger.info("Update Notifications started");

	setInterval(async () => {}, INTERVAL);
};
