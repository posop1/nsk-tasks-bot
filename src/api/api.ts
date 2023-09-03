import { logger } from "../libs/logger/logger";
import { storage } from "../libs/storage/fileStorage";
import { IBoard } from "../types/board";
import { IProjects } from "../types/projects";
import api from "./instance";

const getProjects = async () => {
	try {
		const { data } = await api.get<IProjects>("/projects");

		return data;
	} catch (error) {
		return logger.error(error, "get projects error");
	}
};

const getAllBoards = async () => {
	try {
		const projectsData = storage.readCardsCount();

		if (!projectsData) {
			return logger.error("projects data not found");
		}

		const boards: IBoard[] = [];

		for (let i = 0; i < projectsData.length; i++) {
			const { data } = await api.get<IBoard>(`/boards/${projectsData[i].id}`);

			boards.push(data);
		}

		// const boards = projectsData.map(async (item) => {
		// 	const { data } = await api.get<IBoard>(`/boards/${item.id}`);

		// 	return data;
		// });

		// if (!boards) {
		// 	return logger.error("fetch boards array");
		// }

		return boards;
	} catch (error) {
		return logger.error(error, "get all boards");
	}
};

const getNetworkBoard = async () => {
	try {
		const { data } = await api.get<IBoard>("/boards/1054158202398049360");

		return data;
	} catch (error) {
		return logger.error(error, "get network board");
	}
};

const getServiceBoard = async () => {
	try {
		const { data } = await api.get<IBoard>("/boards/1054158451237717074");

		return data;
	} catch (error) {
		return logger.error(error, "get service board");
	}
};

const getQuestBoard = async () => {
	try {
		const { data } = await api.get<IBoard>("/boards/1054158675112887380");

		return data;
	} catch (error) {
		return logger.error(error, "get quest board");
	}
};

const getArchiveBoard = async () => {
	try {
		const { data } = await api.get<IBoard>("/boards/1054925397256308248");

		return data;
	} catch (error) {
		return logger.error(error, "get archive board");
	}
};

export const fetch = {
	getNetworkBoard,
	getArchiveBoard,
	getServiceBoard,
	getQuestBoard,
	getProjects,
	getAllBoards
};
