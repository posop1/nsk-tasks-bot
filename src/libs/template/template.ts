import { IBoardCard } from "../../types/board";
import { logger } from "../logger/logger";

export const getNewTaskTemplate = (task: IBoardCard, boardName: string) => {
	try {
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
