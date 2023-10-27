import { Bot, Context, Api, RawApi } from "grammy";
import { config } from "../config/config";
import { get } from "../api/get";
import { logger } from "../../libs/logger/logger";
import { storage } from "../../libs/storage/fileStorage";
import { IBoardDataFile } from "../types/dataFile";
import { template } from "../../libs/template/template";
import { IBoardUser } from "../types/board";

export const createTaskNotifications = (CHATID: string, bot: Bot<Context, Api<RawApi>>) => {
	const INTERAVAL = +config.INTERVAL;
	logger.info("Create Notification started");

	setInterval(async () => {
		const boards = await get.allBoards();

		if (!boards) {
			return logger.error("Create Notification - boards not found");
		}

		const fileData = boards.map((item) => {
			const boardsData: IBoardDataFile = {
				...item.item,
				cardsCount: item.included.cards.length
			};

			return boardsData;
		});

		const previousBoards = storage.readBoardsData();
		if (!previousBoards) {
			return logger.error("Create Notification - previous boards not found");
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
				if (item.cardsCount) {
					sum += item.cardsCount;
				}
			});

			return sum;
		};

		if (getAllCardsLength() === getPreviousCardsLength()) {
			storage.writeBoardsData(fileData);

			return;
		}

		for (let i = 0; i < boards.length; i++) {
			if (boards[i].included.cards.length > previousBoards[i].cardsCount!) {
				try {
					const cards = boards[i].included.cards.sort((a, b) => {
						const dateA = new Date(a.createdAt).valueOf();
						const dateB = new Date(b.createdAt).valueOf();

						return dateA - dateB;
					});

					const newCardsCount = boards[i].included.cards.length - previousBoards[i].cardsCount!;

					const newCards = cards.splice(cards.length - newCardsCount, newCardsCount);

					for (let j = 0; j < newCards.length; j++) {
						if (newCards[j].description === "" || !newCards[j].description) {
							logger.info(`Create Notification - Card: ${newCards[j].name}  no description`);
							return;
						}

						const card = await get.card(newCards[j].id);

						if (!card) {
							return logger.error("Create Notification - get card");
						}

						const cardsList = boards[i].included.lists.map((item) => {
							if (card.item.listId === item.id) {
								return item.name;
							}
						});

						const cardUsers = () => {
							const users: IBoardUser[] = [];
							boards[i].included.users.map((item) => {
								card.included.cardMemberships.map((user) => {
									if (user.userId === item.id) {
										users.push(item);
									}
								});
							});
							return users;
						};

						const message = template.newTask(card.item, boards[i].item.name, cardsList, cardUsers());

						await bot.api.sendMessage(CHATID, `${message}`);

						logger.info(`Create Notification - ${boards[i].item.name}: send message`);
					}
				} catch (error) {
					logger.error(error, `Create Notification - ${boards[i].item.name}: not send message`);
				}
			}
		}

		storage.writeBoardsData(fileData);
	}, INTERAVAL);
};
