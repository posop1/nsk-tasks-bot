import { Bot } from "grammy";
import { config } from "./config/config";
import { logger } from "./libs/logger/logger";
import notification from "./notification";

const startBot = () => {
	try {
		const { TOKEN, ENV, CHATID } = config;

		const bot = new Bot(TOKEN);

		bot.start();

		logger.info(`Bot started on ${ENV} mode`);

		notification.createTaskNotifications(CHATID, bot);
	} catch (error) {
		logger.error(error, "startBot");
	}
};

startBot();
