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
			`<b>Новая задача:</b> ${card.name}` +
			"\n" +
			`<b>Доска:</b> ${boardName}` +
			"\n" +
			`<b>Колонка:</b> ${cardList.toString().replace(/[\s.,%]/g, " ")}` +
			"\n" +
			`${cardUsers.length ? `<b>Участники:</b> ${cardUsers.map((item) => item.name + " ")}` : ""}` +
			"\n" +
			`${card.description ? `<b>Описание:</b> ${card.description}` : ""}` +
			"\n \n" +
			`ID:<code> ${card.id}</code>`;

		return template;
	} catch (error) {
		logger.error(error, "Get template - new task error");
	}
};

const taskUpdate = (cardName: string, cardList: string, previousCardList: string) => {
	try {
		const template =
			`<b>Задача:</b> ${cardName}` +
			"\n" +
			`<b>Перместилась:</b> ${previousCardList.toString().replace(/[\s.,%]/g, " ")} ⤍ ${cardList
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
