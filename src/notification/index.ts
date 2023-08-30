/* eslint-disable @typescript-eslint/no-explicit-any */
import { getArchiveCards, getNetworkCards, getQuestCards, getServiceCards } from "../api/api";
import { logger } from "../libs/logger/logger";
import { storage } from "../libs/storage/fileStorage";

export const startNotification = (CHATID: string, bot: any) => {
	try {
		setInterval(
			async () => {
				const networkCards = await getNetworkCards();
				const serviceCards = await getServiceCards();
				const questCards = await getQuestCards();
				const archiveCards = await getArchiveCards();

				if (!networkCards || !serviceCards || !questCards || !archiveCards) {
					return logger.error("cards not found");
				}

				const prev = storage.readPrevNumber();

				if (!prev || prev < 0) {
					return logger.error("prev number not found");
				}

				const allCards = networkCards.concat(serviceCards, questCards, archiveCards);

				if (allCards.length > prev) {
					const card = allCards[allCards.length - 1];

					await bot.api.sendMessage(CHATID, `TASK: ${card.name}`);

					logger.info("send message");
				}
				storage.writePrevNumber({ number: allCards.length });
			},
			10000 * 6 * 5
		);
	} catch (error) {
		logger.error(error, "start notification");
	}
};
