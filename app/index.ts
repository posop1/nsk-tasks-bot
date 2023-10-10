import { Bot } from "grammy";
import { config } from "./config/config";
import { logger } from "../libs/logger/logger";
import notification from "./notification";
import { migrateDbFile } from "../libs/migrate/migrate";

const startBot = () => {
	try {
		const { TOKEN, ENV, CHATID } = config;

		const bot = new Bot(TOKEN);

		bot.start();

		logger.info(`Bot started on ${ENV} mode`);

		migrateDbFile();

		notification.createTaskNotifications(CHATID, bot);
	} catch (error) {
		logger.error(error, "startBot");
	}
};

startBot();
