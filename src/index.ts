import { Bot } from "grammy";
import { getConfig } from "./config/config";
import { logger } from "./libs/logger/logger";

const startBot = () => {
	try {
		const { TOKEN, ENV } = getConfig();

		const bot = new Bot(TOKEN);

		bot.start();
		logger.info(`Bot started on ${ENV} mode.`);
	} catch (error) {
		logger.error(error, "startBot");
	}
};

startBot();
