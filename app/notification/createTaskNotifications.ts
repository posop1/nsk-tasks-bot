import { Bot, Context, Api, RawApi } from "grammy";
import { config } from "../config/config";
import { fetch } from "../api/api";
import { logger } from "../../libs/logger/logger";
import { storage } from "../../libs/storage/fileStorage";
import { IDataFile } from "../types/dataFile";
import { getNewTaskTemplate } from "../../libs/template/template";

export const createTaskNotifications = (CHATID: string, bot: Bot<Context, Api<RawApi>>) => {
	const INTERAVAL = +config.INTERVAL;

	setInterval(async () => {
		const boards = await fetch.getAllBoards();

		if (!boards) {
			return logger.error("Create Notification - boards not found");
		}

		const fileData = boards.map((item) => {
			const boardsData: IDataFile = {
				...item.item,
				count: item.included.cards.length
			};

			return boardsData;
		});

		const previousBoards = storage.readBoardsData();
		if (!previousBoards) {
			return logger.error("Create Notification - previous boards not found, get npm run migrate");
		}

		const getAllCardsLength = (): number => {
			let sum = 0;

			boards.map((item) => {
				sum += item.included.cards.length;
			});

			return sum;
		};
		const getPreviousCardsLength = (): number => {
			let sum = 0;

			previousBoards.map((item) => {
				if (item.count) {
					sum += item.count;
				}
			});

			return sum;
		};

		if (getAllCardsLength() === getPreviousCardsLength()) {
			storage.writeBoardsData(fileData);

			return;
		}

		for (let i = 0; i < boards.length; i++) {
			if (boards[i].included.cards.length > previousBoards[i].count!) {
				try {
					const cards = boards[i].included.cards.sort((a, b) => {
						const dateA = new Date(a.createdAt).valueOf();
						const dateB = new Date(b.createdAt).valueOf();

						return dateA - dateB;
					});

					const newTaskCount = boards[i].included.cards.length - previousBoards[i].count!;

					const newTasks = cards.splice(cards.length - newTaskCount, newTaskCount);

					for (let j = 0; j < newTasks.length; j++) {
						if (newTasks[j].description === "" || !newTasks[j].description) {
							logger.info("Create Notification - No description");
							return;
						}
						const template = getNewTaskTemplate(newTasks[j], boards[i].item.name);

						await bot.api.sendMessage(CHATID, `${template}`);

						logger.info(`Create Notification - ${boards[i].item.name}: send message`);
					}
				} catch (error) {
					logger.error(error, `Create Notification - ${boards[i].item.name}: send message`);
				}
			}
		}

		logger.info("writeFile");

		storage.writeBoardsData(fileData);
	}, INTERAVAL);
};
