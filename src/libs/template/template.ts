import { IBoard } from "../../types/board";
import { logger } from "../logger/logger";

export const getNewTaskTemplate = (board: IBoard) => {
	try {
		const cards = board.included.cards.sort((a, b) => {
			const dateA = new Date(a.createdAt).valueOf();
			const dateB = new Date(b.createdAt).valueOf();

			return dateA - dateB;
		});

		const task = cards[cards.length - 1];
		const boardName = board.item.name;

		const template =
			`Новая Задача: ${task.name}` +
			"\n" +
			`Доска: ${boardName}` +
			"\n" +
			`${task.description ? `Описание: ${task.description}` : ""}`;

		return template;
	} catch (error) {
		logger.error(error, "get template");
	}
};
