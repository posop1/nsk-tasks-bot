import { Bot, Context, Api, RawApi } from "grammy";
import { config } from "../config/config";
import { logger } from "../../libs/logger/logger";
import { get } from "../api/get";
import { storage } from "../../libs/storage/fileStorage";
import { IBoardCard } from "../types/board";
import { template } from "../../libs/template/template";

export const updateTaskNotifications = (CHATID: string, bot: Bot<Context, Api<RawApi>>) => {
	const INTERVAL = +config.INTERVAL;
	logger.info("Update Notifications started");

	setInterval(async () => {
		const boards = await get.allBoards();

		if (!boards) {
			return logger.error("Update Notification - boards not found");
		}

		const cards: IBoardCard[] = [];

		boards.map((board) => {
			board.included.cards.map((card) => {
				cards.push(card);
			});
		});

		const previousCards = storage.readCardsData();
		if (!previousCards) {
			return logger.error("Update Notification - previous cards not found");
		}

		for (let i = 0; i < cards.length; i++) {
			for (let j = 0; j < previousCards.length; j++) {
				if (cards[i].id === previousCards[j].id) {
					if (cards[i].listId !== previousCards[j].listId) {
						let list = "";
						boards.map((board) => {
							board.included.lists.map((item) => {
								if (cards[i].listId === item.id) {
									list = list + item.name;
								}
							});
						});

						let previousList = "";
						boards.map((board) => {
							board.included.lists.map((item) => {
								if (previousCards[j].listId === item.id) {
									previousList = previousList = item.name;
								}
							});
						});

						const message = template.taskUpdate(cards[i].name, list, previousList);

						await bot.api.sendMessage(CHATID, `${message}`);

						logger.info(`Update Notification - ${cards[i].name}: send message`);
					}
				}
			}
		}

		storage.writeCardsData(cards);
	}, INTERVAL);
};
