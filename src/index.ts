import { Bot } from "grammy";
import { getConfig } from "./config/config";
import { logger } from "./libs/logger/logger";
import { startNotification } from "./notification";
// import { checkFile } from "./libs/storage/fileStorage";

const startBot = () => {
	try {
		const { TOKEN, ENV, CHATID } = getConfig();

		const bot = new Bot(TOKEN);

		bot.start();

		logger.info(`Bot started on ${ENV} mode`);

		// checkFile();
		startNotification(CHATID, bot);
	} catch (error) {
		logger.error(error, "startBot");
	}
};

startBot();
