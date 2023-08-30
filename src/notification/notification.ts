/* eslint-disable @typescript-eslint/no-explicit-any */
import { getArchiveBoard, getNetworkBoard, getQuestBoard, getServiceBoard } from "../api/api";
import { logger } from "../libs/logger/logger";
import { storage } from "../libs/storage/fileStorage";
import { getTemplate } from "../libs/template/template";
import { IDataFile } from "../types/prevNumbers";

export const startNotification = (CHATID: string, bot: any) => {
	setInterval(async () => {
		const networkBoard = await getNetworkBoard();
		const serviceBoard = await getServiceBoard();
		const questBoard = await getQuestBoard();
		const archiveBoard = await getArchiveBoard();

		if (!networkBoard || !serviceBoard || !questBoard || !archiveBoard) {
			return logger.error("cards not found");
		}

		const prevNumbers = storage.readPrevNumber();
		if (!prevNumbers) {
			return logger.error("prev numbers not found");
		}

		const allCardsLength: IDataFile = {
			archive: archiveBoard.included.cards.length,
			network: networkBoard.included.cards.length,
			quest: questBoard.included.cards.length,
			service: serviceBoard.included.cards.length
		};

		const sumAllCardsLength =
			allCardsLength.archive + allCardsLength.network + allCardsLength.quest + allCardsLength.service;
		const sumPrevLength =
			prevNumbers.archive + prevNumbers.network + prevNumbers.quest + prevNumbers.service;

		if (sumAllCardsLength === sumPrevLength) {
			storage.writePrevNumber(allCardsLength);

			return logger.info("sum all cards length and prev num length equal");
		}

		if (networkBoard.included.cards.length > prevNumbers.network) {
			try {
				const template = getTemplate(networkBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("networkCards: send message");
			} catch (error) {
				logger.error(error, "networkCards: send message");
			}
		}

		if (serviceBoard.included.cards.length > prevNumbers.service) {
			try {
				const template = getTemplate(serviceBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("serviceCards: send message");
			} catch (error) {
				logger.error(error, "serviceCards: send message");
			}
		}

		if (questBoard.included.cards.length > prevNumbers.quest) {
			try {
				const template = getTemplate(questBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("questCards: send message");
			} catch (error) {
				logger.error(error, "questCards: send message");
			}
		}

		if (archiveBoard.included.cards.length > prevNumbers.archive) {
			try {
				const template = getTemplate(archiveBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("archiveCards: send message");
			} catch (error) {
				logger.error(error, "archiveCards: send message");
			}
		}
		storage.writePrevNumber(allCardsLength);
	}, 10000);
};
