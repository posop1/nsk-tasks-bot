import { IBoardCard } from "../../app/types/board";
import { logger } from "../logger/logger";

export const getNewTaskTemplate = (
	task: IBoardCard,
	boardName: string,
	taskList: (string | undefined)[]
) => {
	try {
		console.log(taskList);

		const template =
			`Новая Задача: ${task.name}` +
			"\n" +
			`Доска: ${boardName}` +
			"\n" +
			`Колонка:${taskList.toString().replace(/[\s.,%]/g, " ")}` +
			"\n" +
			`${task.description ? `Описание: ${task.description}` : ""}`;

		return template;
	} catch (error) {
		logger.error(error, "get template");
	}
};
