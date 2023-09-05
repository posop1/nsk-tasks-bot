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
		const projectsData = storage.readBoardsData();

		if (!projectsData) {
			return logger.error("projects data not found");
		}

		const boards: IBoard[] = [];

		for (let i = 0; i < projectsData.length; i++) {
			const { data } = await api.get<IBoard>(`/boards/${projectsData[i].id}`);

			boards.push(data);
		}

		return boards;
	} catch (error) {
		return logger.error(error, "get all boards");
	}
};

export const fetch = {
	getProjects,
	getAllBoards
};
