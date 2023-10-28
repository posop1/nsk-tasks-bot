import { IBoardUser } from "../../app/types/board";
import { ICardItem } from "../../app/types/card";
import { logger } from "../logger/logger";

const newTask = (
	card: ICardItem,
	boardName: string,
	cardList: (string | undefined)[],
	cardUsers: IBoardUser[]
) => {
	try {
		const template =
			`Новая Задача: ${card.name}` +
			"\n" +
			`Доска: ${boardName}` +
			"\n" +
			`Колонка: ${cardList.toString().replace(/[\s.,%]/g, " ")}` +
			"\n" +
			`${cardUsers.length ? `Участники: ${cardUsers.map((item) => item.name + " ")} \n` : ""}` +
			`${card.description ? `Описание: ${card.description}` : ""}`;

		return template;
	} catch (error) {
		logger.error(error, "Get template - new task error");
	}
};

const taskUpdate = (cardName: string, cardList: string, previousCardList: string) => {
	try {
		const template =
			`Задача: ${cardName}` +
			"\n" +
			`Перместилась: ${previousCardList.toString().replace(/[\s.,%]/g, " ")} ⤍ ${cardList
				.toString()
				.replace(/[\s.,%]/g, " ")}`;

		return template;
	} catch (error) {
		logger.error(error, "Get template - task update");
	}
};

export const template = {
	newTask,
	taskUpdate
};
