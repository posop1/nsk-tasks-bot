import { IBoardUser } from "../../app/types/board";
import { ICardItem } from "../../app/types/card";
import { logger } from "../logger/logger";

export const getNewTaskTemplate = (
	task: ICardItem,
	boardName: string,
	taskList: (string | undefined)[],
	taskUsers: IBoardUser[]
) => {
	try {
		const template =
			`Новая Задача: ${task.name}` +
			"\n" +
			`Доска: ${boardName}` +
			"\n" +
			`Колонка:${taskList.toString().replace(/[\s.,%]/g, " ")}` +
			"\n" +
			`Участники: ${taskUsers.map((item) => item.name + " ")}` +
			"\n" +
			`${task.description ? `Описание: ${task.description}` : ""}`;

		return template;
	} catch (error) {
		logger.error(error, "get template");
	}
};
