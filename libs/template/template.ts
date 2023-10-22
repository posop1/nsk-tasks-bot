import { IBoardUser } from "../../app/types/board";
import { ICardItem } from "../../app/types/card";
import { logger } from "../logger/logger";

export const getNewTaskTemplate = (
	card: ICardItem,
	boardName: string,
	cardsList: (string | undefined)[],
	cardUsers: IBoardUser[]
) => {
	try {
		const template =
			`Новая Задача: ${card.name}` +
			"\n" +
			`Доска: ${boardName}` +
			"\n" +
			`Колонка: ${cardsList.toString().replace(/[\s.,%]/g, " ")}` +
			"\n" +
			`Участники: ${cardUsers.map((item) => item.name + " ")}` +
			"\n" +
			`${card.description ? `Описание: ${card.description}` : ""}`;

		return template;
	} catch (error) {
		logger.error(error, "get template");
	}
};
