import { Bot } from "grammy";
import { config } from "./config/config";
import { logger } from "../libs/logger/logger";
import notification from "./notification";
import { migrateBoardsFile } from "../libs/migrate/migrate";

const startBot = () => {
	try {
		const { TOKEN, NODE_ENV, CHATID } = config;

		const bot = new Bot(TOKEN);

		bot.start();

		logger.info(`Bot started on ${NODE_ENV} mode`);

		migrateBoardsFile();

		notification.createTaskNotifications(CHATID, bot);
	} catch (error) {
		logger.error(error, "startBot");
	}
};

startBot();
