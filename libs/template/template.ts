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
		// const users = [
		// 	{
		// 		name: "Яхин А.З.",
		// 		link: "@iamnotadeveloper"
		// 	},
		// 	{
		// 		name: "Бахматов С.В.",
		// 		link: "@Getoutaway"
		// 	},
		// 	{
		// 		name: "Аминова Н.Я.",
		// 		link: "@NailyaBahtieva"
		// 	},
		// 	{
		// 		name: "Холодилов А.С.",
		// 		link: "@Freez_Izzy"
		// 	},
		// 	{
		// 		name: "Хайдаров Р.Р.",
		// 		link: "@caxapo4uk777"
		// 	},
		// 	{
		// 		name: "Глазов А.В.",
		// 		link: "@victopy"
		// 	},
		// 	{
		// 		name: "Танкеева Е.А.",
		// 		link: "@katenochek_nv"
		// 	}
		// ];

		// const setUserTemplate = () => {
		// 	const usersTemplate: string[] = [];

		// 	for (let i = 0; i < cardUsers.length; i++) {
		// 		for (let j = 0; j < users.length; j++) {
		// 			if (cardUsers[i].name === users[j].name) {
		// 				usersTemplate.push(users[j].link);
		// 				break;
		// 			} else if (cardUsers[i].name !== users[j].name && usersTemplate[i] !== cardUsers[i].name) {
		// 				usersTemplate.push(cardUsers[i].name);
		// 				break;
		// 			}
		// 		}
		// 	}

		// 	if (!usersTemplate.length) {
		// 		return "";
		// 	}

		// 	return usersTemplate.join(", ");
		// };

		const template =
			`<b>Новая задача:</b> ${card.name}` +
			"\n" +
			`<b>Доска:</b> ${boardName}` +
			"\n" +
			`<b>Колонка:</b> ${cardList.toString().replace(/[\s.,%]/g, " ")}` +
			"\n" +
			`<b>Участники:</b> ${cardUsers.map((user) => `${user.name}`)}` +
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
