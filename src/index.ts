import { Bot } from "grammy";
import { getConfig } from "./config/config";
import { getLogger } from "./libs/logger/logger";

const startBot = () => {
	const logger = getLogger();

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
