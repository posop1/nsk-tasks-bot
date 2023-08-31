/* eslint-disable @typescript-eslint/no-explicit-any */
import { Api, Bot, Context, RawApi } from "grammy";
import { fetch } from "../api/api";
import { logger } from "../libs/logger/logger";
import { storage } from "../libs/storage/fileStorage";
import { getTemplate } from "../libs/template/template";
import { IDataFile } from "../types/prevNumbers";
import { config } from "../config/config";

export const createTaskNotification = (CHATID: string, bot: Bot<Context, Api<RawApi>>) => {
	const INTERVAL = +config.INTERVAL;

	setInterval(async () => {
		const networkBoard = await fetch.getNetworkBoard();
		const serviceBoard = await fetch.getServiceBoard();
		const questBoard = await fetch.getQuestBoard();
		const archiveBoard = await fetch.getArchiveBoard();

		if (!networkBoard || !serviceBoard || !questBoard || !archiveBoard) {
			return logger.error("cards not found");
		}

		const previousCardsLength = storage.readCardsCount();
		if (!previousCardsLength) {
			return logger.error("previous cards length not found");
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
			previousCardsLength.archive +
			previousCardsLength.network +
			previousCardsLength.quest +
			previousCardsLength.service;

		if (sumAllCardsLength === sumPrevLength) {
			storage.writeCardsCount(allCardsLength);

			return logger.info("sum all cards length and previous cards length equal");
		}

		if (networkBoard.included.cards.length > previousCardsLength.network) {
			try {
				const template = getTemplate(networkBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("networkCards: send message");
			} catch (error) {
				logger.error(error, "networkCards: send message");
			}
		}

		if (serviceBoard.included.cards.length > previousCardsLength.service) {
			try {
				const template = getTemplate(serviceBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("serviceCards: send message");
			} catch (error) {
				logger.error(error, "serviceCards: send message");
			}
		}

		if (questBoard.included.cards.length > previousCardsLength.quest) {
			try {
				const template = getTemplate(questBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("questCards: send message");
			} catch (error) {
				logger.error(error, "questCards: send message");
			}
		}

		if (archiveBoard.included.cards.length > previousCardsLength.archive) {
			try {
				const template = getTemplate(archiveBoard);

				await bot.api.sendMessage(CHATID, `${template}`);

				logger.info("archiveCards: send message");
			} catch (error) {
				logger.error(error, "archiveCards: send message");
			}
		}
		storage.writeCardsCount(allCardsLength);
	}, INTERVAL);
};
