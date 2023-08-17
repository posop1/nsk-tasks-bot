import { Bot } from "grammy";
import { getConfig } from "./config/config";

const startBot = () => {
	try {
		const { TOKEN } = getConfig();

		const bot = new Bot(TOKEN);

		bot.start();
	} catch (error) {
		console.log("[ERROR] startBot", error);
	}
};

startBot();
