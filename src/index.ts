import { Bot } from "grammy";
import { getConfig } from "./config/config";
import { logger } from "./libs/logger/logger";

const startBot = () => {
	try {
		const { TOKEN } = getConfig();

		const bot = new Bot(TOKEN);

		bot.start();
	} catch (error) {
		logger.error(`startBot ${error}`);
	}
};

startBot();
